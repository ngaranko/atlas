(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('polygon', polygonFactory);

    polygonFactory.$inject = ['L', 'POLYGON_CONFIG', 'onMapClick'];

    function polygonFactory (L, POLYGON_CONFIG, onMapClick) {
        let leafletMap,
            drawnItems,
            drawShapeHandler,
            editShapeHandler,
            firstMarker,
            lastMarker,
            currentLayer,
            polygonInstance = {
                initialize,
                toggle,
                isActive: false
            };

        return polygonInstance;

        function initialize (map) {
            let editConfig = angular.copy(POLYGON_CONFIG.edit),
                editToolbar;

            leafletMap = map;
            drawnItems = new L.FeatureGroup();
            drawShapeHandler = new L.Draw.Polygon(leafletMap, POLYGON_CONFIG.draw.polygon);

            editConfig.featureGroup = drawnItems;
            editToolbar = new L.EditToolbar(editConfig);
            editShapeHandler = editToolbar.getModeHandlers(leafletMap)[0].handler;

            leafletMap.addLayer(drawnItems);
            leafletMap.on('click', function () {
                if (!drawShapeHandler.enabled()) {
                    deleteShape();
                }
            });
            leafletMap.on(L.Draw.Event.DRAWSTART, function () {
                onMapClick.disable();
            });
            leafletMap.on(L.Draw.Event.DRAWSTOP, function () {
                onMapClick.enable();
            });
            leafletMap.on(L.Draw.Event.DRAWVERTEX, function () {
                bindLastMarker();
            });
            leafletMap.on(L.Draw.Event.CREATED, function (e) {
                var type = e.layerType,
                    layer = e.layer;

                if (type === 'polygon') {
                    currentLayer = layer;
                    drawnItems.addLayer(layer);
                    layer.on('click', shapeClickHandler);
                    polygonInstance.isActive = false;
                }
            });
        }

        function bindLastMarker () {
            if (lastMarker) {
                lastMarker.off('click', deleteLastMarker);
                lastMarker = null;
            }
            if (drawShapeHandler.enabled() && drawShapeHandler._markers.length) {
                lastMarker = drawShapeHandler._markers[drawShapeHandler._markers.length - 1];
                if (lastMarker) {
                    lastMarker.on('click', deleteLastMarker);
                }
            }
            if (!firstMarker && lastMarker) {
                firstMarker = lastMarker;
                firstMarker.on('click', completeShape);
            }
        }

        // When trying to complete a shape of only two points (a line) by
        // clicking on the first vertex again results in Leaflet draw giving an
        // error that the lines should not cross. Even though
        // `allowIntersection` is enabled in the configuration.
        function completeShape () {
            if (drawShapeHandler.enabled() && drawShapeHandler._markers.length === 2) {
                toggle();
            }
        }

        function deleteLastMarker () {
            if (drawShapeHandler.enabled()) {
                if (drawShapeHandler._markers.length === 1) {
                    // Leaflet draw does not allow deleting the very first
                    // marker; work around by disabling and enabling the draw
                    // tool.
                    toggle();
                    toggle();
                } else if (drawShapeHandler._markers.length > 1) {
                    drawShapeHandler.deleteLastVertex();
                    bindLastMarker();
                }
            }
        }

        function shapeClickHandler (e) {
            L.DomEvent.stop(e);
            toggle();
        }

        function toggle () {
            if (drawShapeHandler.enabled()) {
                if (drawShapeHandler._markers.length > 1) {
                    drawShapeHandler.completeShape();
                } else {
                    drawShapeHandler.disable();
                }
                polygonInstance.isActive = false;
            } else if (editShapeHandler.enabled()) {
                editShapeHandler.save();
                editShapeHandler.disable();
                polygonInstance.isActive = false;
            } else if (currentLayer) {
                editShapeHandler.enable();
                polygonInstance.isActive = true;
            } else {
                drawShapeHandler.enable();
                polygonInstance.isActive = true;
            }
        }

        function deleteShape () {
            if (currentLayer) {
                let deletedLayers = new L.LayerGroup();
                currentLayer.off('click', shapeClickHandler);
                drawnItems.removeLayer(currentLayer);
                deletedLayers.addLayer(currentLayer);
                leafletMap.fire(L.Draw.Event.DELETED, { layers: deletedLayers });
                currentLayer = null;
                if (editShapeHandler.enabled()) {
                    editShapeHandler.disable();
                    polygonInstance.isActive = false;
                }
            }
        }
    }
})();
