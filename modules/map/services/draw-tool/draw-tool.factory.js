(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('drawTool', drawToolFactory);

    // TODO Delete store and ACTIONS...

    drawToolFactory.$inject = ['$rootScope', 'L', 'DRAW_TOOL_CONFIG'];

    /* istanbul ignore next */
    function drawToolFactory ($rootScope, L, DRAW_TOOL_CONFIG) {
        let c = console;

        const MARKERS_MAX_COUNT = 4;

        let currentShape = {
            isConsistent: true,
            type: null,
            layer: null,
            markers: [],
            markersPrev: [],
            markersMaxCount: MARKERS_MAX_COUNT,
            area: 0,
            areaTxt: '',
            distance: 0,
            distanceTxt: ''
        };

        let shapeInfo = {};
        updateShapeInfo(currentShape);

        let drawTool = {
            drawingMode: null,
            drawnItems: null,
            drawShapeHandler: null,
            editShapeHandler: null
        };

        let _onFinishPolygon,
            _onDrawingMode;

        return {
            initialize,
            isEnabled,
            enable,
            disable,
            shape: shapeInfo
        };

        function updateShapeInfo () {
            ['type', 'markers', 'markersMaxCount', 'area', 'areaTxt', 'distance', 'distanceTxt']
                .forEach(key => {
                    shapeInfo[key] = currentShape[key];
                });
        }

        function onFinishPolygon () {
            updateShape();
            c.log('onFinishPolygon', currentShape);
            if (angular.isFunction(_onFinishPolygon)) {
                $rootScope.$applyAsync(() => _onFinishPolygon(shapeInfo));
            }
        }

        function onChangePolygon () {
            $rootScope.$applyAsync(() => updateShapeInfo());
        }

        function setDrawingMode (drawingMode) {
            if (drawTool.drawingMode !== drawingMode) {
                $rootScope.$applyAsync(() => {
                    drawTool.drawingMode = drawingMode;
                    _onDrawingMode(drawingMode);
                });
            }
        }

        function setPolygon (latLngs) {
            deletePolygon();
            createPolygon(new L.Polygon(latLngs));
        }

        function createPolygon (layer) {
            currentShape.layer = layer;
            drawTool.drawnItems.addLayer(layer);
            layer.on('click', shapeClickHandler);
        }

        function deletePolygon () {
            if (currentShape.layer) {
                currentShape.layer.off('click', shapeClickHandler);
                drawTool.drawnItems.removeLayer(currentShape.layer);

                let deletedLayers = new L.LayerGroup();
                deletedLayers.addLayer(currentShape.layer);
                drawTool.map.fire(L.Draw.Event.DELETED, { layers: deletedLayers });

                currentShape.layer = null;
            }
        }

        function finishPolygon () {
            setDrawingMode(null);
            onFinishPolygon();
        }

        // Click on the shape toggles EDIT mode
        function shapeClickHandler (e) {
            L.DomEvent.stop(e);
            toggle();
        }

        function initDrawTool (map) {
            let editConfig,
                editToolbar;

            drawTool.map = map;
            drawTool.drawnItems = new L.FeatureGroup();
            drawTool.drawShapeHandler = new L.Draw.Polygon(drawTool.map, DRAW_TOOL_CONFIG.draw.polygon);

            editConfig = angular.copy(DRAW_TOOL_CONFIG.edit);
            editConfig.featureGroup = drawTool.drawnItems;
            editToolbar = new L.EditToolbar(editConfig);

            drawTool.editShapeHandler = editToolbar.getModeHandlers(drawTool.map)[0].handler;

            drawTool.map.addLayer(drawTool.drawnItems);
        }

        function registerEvents () {
            registerDrawEvents();
            registerOtherEvents();
        }

        function enforceLimits () {
            if (currentShape.markers.length > currentShape.markersMaxCount || currentShape.intersects) {
                currentShape.isConsistent = false;
                let markersPrev = angular.copy(currentShape.markersPrev);
                $rootScope.$applyAsync(() => {
                    if (drawTool.drawingMode === 'DRAW') {
                        deleteMarker(getLastDrawnMarker());
                        currentShape.isConsistent = true;
                    } else {
                        deletePolygon();
                        $rootScope.$applyAsync(() => {
                            setPolygon(markersPrev);
                            currentShape.isConsistent = true;
                            updateShape();
                        });
                    }
                });
            }
        }

        function handleDrawEvent (eventName, e) {
            let handlers = {
                DRAWSTART: () => setDrawingMode('DRAW'),
                DRAWVERTEX: bindLastDrawnMarker,
                DRAWSTOP: finishPolygon,
                CREATED: () => createPolygon(e.layer),
                EDITSTART: () => setDrawingMode('EDIT'),
                // EDITVERTEX
                EDITSTOP: finishPolygon,
                // EDITED
                DELETED: () => {
                    currentShape.layer = null;
                }
            };

            let handler = handlers[eventName];
            if (handler) {
                handler(e);
            }
        }

        function registerDrawEvents () {
            Object.keys(L.Draw.Event).forEach(eventName => {
                drawTool.map.on(L.Draw.Event[eventName], function (e) {
                    c.log('Leaflet Event', eventName);

                    handleDrawEvent(eventName, e);

                    updateShape();

                    enforceLimits();

                    if (currentShape.isConsistent) {
                        onChangePolygon();
                    }
                });
            });
        }

        function registerOtherEvents () {
            // Click outside shape => delete shape
            drawTool.map.on('click', function () {
                // c.log('Click event', drawTool.drawingMode);
                // Not in draw mode: new marker add!!
                if (!(drawTool.drawingMode === 'DRAW' || currentShape.layer === null)) {
                    deletePolygon();
                    onFinishPolygon();
                    disable();
                }
            });
        }

        function toggle () {
            return isEnabled() ? disable() : enable();
        }

        function isEnabled () {
            // isEnabled => shape is being created or being edited
            return ['EDIT', 'DRAW'].indexOf(drawTool.drawingMode) !== -1;
        }

        // start draw or edit mode for current layer or start create mode for new shape
        function enable () {
            if (!isEnabled()) {
                if (currentShape.layer) {   // Shape exists, start edit
                    drawTool.editShapeHandler.enable();
                } else {    // Shape does not yet exist, start draw
                    drawTool.drawShapeHandler.enable();
                }
            }
        }

        // end of draw or edit mode => in create mode complete shape, in edit mode save shape
        function disable () {
            if (isEnabled()) {
                if (drawTool.drawingMode === 'DRAW') {
                    if (currentShape.markers.length > 1) {
                        drawTool.drawShapeHandler.completeShape();
                    } else {
                        drawTool.drawShapeHandler.disable();
                    }
                } else {
                    drawTool.editShapeHandler.save();
                    drawTool.editShapeHandler.disable();
                }
                setDrawingMode(null);
            }
        }

        function initialize (map, onFinish, onDrawingMode) {
            initDrawTool(map);
            _onFinishPolygon = onFinish;    // callback method to call on finish draw/edit polygon
            _onDrawingMode = onDrawingMode; // callback method to call on change of drawing mode
            registerEvents();
            return shapeInfo;
        }

        // Shape method for shape.info
        function getDistance (latLngs, isClosed) {
            return latLngs.reduce((total, latlng, i) => {
                if (i > 0) {
                    let dist = latlng.distanceTo(latLngs[i - 1]);
                    total += dist;
                }
                return total;
            }, isClosed && latLngs.length > 2 ? latLngs[0].distanceTo(latLngs[latLngs.length - 1]) : 0);
        }

        function updateShape () {
            let latLngs = [],
                area = 0,
                distance = 0,
                intersects = false;

            if (currentShape.layer) {
                latLngs = currentShape.layer.getLatLngs()[0];
                distance = getDistance(latLngs, true);
                area = L.GeometryUtil.geodesicArea(latLngs);
                intersects = currentShape.layer.intersects();
            } else if (drawTool.drawShapeHandler._markers) {
                latLngs = drawTool.drawShapeHandler._markers.map(m => m._latlng);
                area = drawTool.drawShapeHandler._area;
                distance = getDistance(latLngs, false);
            }

            currentShape.markersPrev = angular.copy(currentShape.markers);
            currentShape.markers = latLngs.map(({lat, lng}) => [lat, lng]);
            currentShape.area = area;
            currentShape.areaTxt = L.GeometryUtil.readableArea(area, true);
            currentShape.distance = distance;
            currentShape.distanceTxt = L.GeometryUtil.readableDistance(distance, true);
            currentShape.intersects = intersects;

            L.drawLocal.edit.handlers.edit.tooltip.text = currentShape.areaTxt;
            L.drawLocal.edit.handlers.edit.tooltip.subtext = currentShape.distanceTxt;
        }

        // delete a marker in DRAW mode
        function deleteMarker (marker) {
            let drawShapeHandler = drawTool.drawShapeHandler;
            let markers = drawShapeHandler._markers || [];
            let index = markers.findIndex(m => m._leaflet_id === marker._leaflet_id);
            if (index > 0) {    // Don't delete on click on first marker, this should close the shape
                let nDelete = markers.length - index;   // Delete all from last to marker, inclusive
                while (nDelete-- > 0) {
                    drawShapeHandler.deleteLastVertex();
                }
            }
        }

        function getLastDrawnMarker () {
            let drawShapeHandler = drawTool.drawShapeHandler;
            return drawShapeHandler._markers[drawShapeHandler._markers.length - 1];
        }

        // bind last marker in DRAW mode to deleteMarker
        function bindLastDrawnMarker () {
            let lastMarker = getLastDrawnMarker();
            ['mousedown', 'click'].forEach(key => lastMarker.on(key, () => {
                if (drawTool.drawShapeHandler.enabled() && drawTool.drawShapeHandler._markers.length === 2) {
                    disable();
                } else {
                    deleteMarker(lastMarker);
                }
            }));
        }
    }
})();
