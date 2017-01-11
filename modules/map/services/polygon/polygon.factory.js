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
            lastMarker,
            currentLayer;

        return {
            initialize,
            toggle
        };

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
                unbindLastMarker();
                getLastMarker();
                bindLastMarker();
            });
            leafletMap.on(L.Draw.Event.CREATED, function (e) {
                var type = e.layerType,
                    layer = e.layer;

                if (type === 'polygon') {
                    currentLayer = layer;
                    drawnItems.addLayer(layer);
                    layer.on('click', shapeClickHandler);
                }
            });
        }

        function bindLastMarker () {
            if (lastMarker) {
                lastMarker.on('click', deleteLastMarker);
            }
        }
        function unbindLastMarker () {
            if (lastMarker) {
                lastMarker.off('click', deleteLastMarker);
            }
        }
        function getLastMarker () {
            if (drawShapeHandler.enabled()) {
                lastMarker = drawShapeHandler._markers[drawShapeHandler._markers.length - 1];
            }
        }
        function deleteLastMarker () {
            if (drawShapeHandler.enabled()) {
                unbindLastMarker();
                drawShapeHandler.deleteLastVertex();
                getLastMarker();
                bindLastMarker();
            }
        }

        function shapeClickHandler (e) {
            L.DomEvent.stop(e);
            toggle();
        }

        function toggle () {
            if (drawShapeHandler.enabled()) {
                drawShapeHandler.completeShape();
            } else if (editShapeHandler.enabled()) {
                editShapeHandler.save();
                editShapeHandler.disable();
            } else if (currentLayer) {
                editShapeHandler.enable();
            } else {
                drawShapeHandler.enable();
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
                }
            }
        }
    }
})();
