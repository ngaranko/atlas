(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('drawTool', drawToolFactory);

    drawToolFactory.$inject = ['store', 'ACTIONS', 'L', 'DRAW_TOOL_CONFIG', 'onMapClick'];

    function drawToolFactory (store, ACTIONS, L, DRAW_TOOL_CONFIG, onMapClick) {
        let leafletMap,
            drawnItems,
            drawShapeHandler,
            editShapeHandler,
            firstMarker,
            lastMarker,
            currentLayer;

        return {
            initialize
        };

        function initialize (map) {
            let editConfig = angular.copy(DRAW_TOOL_CONFIG.edit),
                editToolbar;

            store.subscribe(() => {
                if (store.getState().map.drawingMode) {
                    enable();
                } else {
                    disable();
                }
            });

            leafletMap = map;
            drawnItems = new L.FeatureGroup();
            drawShapeHandler = new L.Draw.Polygon(leafletMap, DRAW_TOOL_CONFIG.draw.polygon);

            editConfig.featureGroup = drawnItems;
            editToolbar = new L.EditToolbar(editConfig);
            editShapeHandler = editToolbar.getModeHandlers(leafletMap)[0].handler;

            leafletMap.addLayer(drawnItems);
            leafletMap.on('click', function () {
                if (!drawShapeHandler.enabled()) {
                    deleteShape();
                }
            });
            leafletMap.on(L.Draw.Event.DRAWSTOP, function () {
                updateState();
            });
            leafletMap.on(L.Draw.Event.DRAWVERTEX, function (e) {
                check(e);
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

        function check (target) {
            let vertexCount = Object.keys(target.layers._layers).length;

            if (vertexCount >= DRAW_TOOL_CONFIG.MAX_POINTS) {
                completeShape();
                try {
                    disable();
                }
            }
        }

        function toggle () {
            if (isEnabled()) {
                disable();
            } else {
                enable();
            }
        }

        function isEnabled () {
            return drawShapeHandler.enabled() || editShapeHandler.enabled();
        }

        function enable () {
            if (!isEnabled()) {
                if (currentLayer) {
                    editShapeHandler.enable();
                } else {
                    drawShapeHandler.enable();
                }
                updateState(true);
            }
        }

        function disable () {
            if (isEnabled()) {
                if (drawShapeHandler.enabled()) {
                    if (drawShapeHandler._markers.length > 1) {
                        drawShapeHandler.completeShape();
                    } else {
                        drawShapeHandler.disable();
                    }
                    updateState(false);
                } else if (editShapeHandler.enabled()) {
                    editShapeHandler.save();
                    editShapeHandler.disable();
                    updateState(false);
                }
            }
        }

        function updateState () {
            let currentMode = null;

            if (isEnabled()) {
                currentMode = drawShapeHandler.enabled() ? 'DRAW' : 'EDIT';
            }

            store.dispatch({
                type: ACTIONS.MAP_SET_DRAWING_MODE,
                payload: currentMode
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
        // error that the lines should not cross.
        function completeShape () {
            if (drawShapeHandler.enabled() && drawShapeHandler._markers.length === 2) {
                disable();
            }
        }

        function deleteLastMarker () {
            if (drawShapeHandler.enabled()) {
                if (drawShapeHandler._markers.length === 1) {
                    // Leaflet draw does not allow deleting the very first
                    // marker; work around by disabling and enabling the draw
                    // tool.
                    disable();
                    enable();
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

        function deleteShape () {
            if (currentLayer) {
                let deletedLayers = new L.LayerGroup();
                currentLayer.off('click', shapeClickHandler);
                drawnItems.removeLayer(currentLayer);
                deletedLayers.addLayer(currentLayer);
                leafletMap.fire(L.Draw.Event.DELETED, { layers: deletedLayers });
                currentLayer = null;
                disable();
            }
        }
    }
})();
