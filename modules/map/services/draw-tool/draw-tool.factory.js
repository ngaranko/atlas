(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('drawTool', drawToolFactory);

    drawToolFactory.$inject = ['$rootScope', 'L', 'DRAW_TOOL_CONFIG'];

    /* istanbul ignore next */
    function drawToolFactory ($rootScope, L, DRAW_TOOL_CONFIG) {
        const MARKERS_MAX_COUNT = 4;

        // holds all information about the state of the shape being created or edited
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

        // holds all publicly available information about the last consistent state of the current shape
        let shapeInfo = {};
        updateShapeInfo(currentShape);

        // holds all information of the leaflet.draw drawing and editing structures
        let drawTool = {
            drawingMode: null,
            drawnItems: null,
            drawShapeHandler: null,
            editShapeHandler: null
        };

        // these callback methods will be called on a finished polygon and on a change of drawing mode
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
            // Copy a set of properties of the current shape into the shapeInfo object
            ['type', 'markers', 'markersMaxCount', 'area', 'areaTxt', 'distance', 'distanceTxt']
                .forEach(key => {
                    shapeInfo[key] = currentShape[key];
                });
        }

        function onFinishPolygon () {
            updateShape();  // Update shape to latest known state
            if (angular.isFunction(_onFinishPolygon)) {
                // call any registered callback function, applyAsync because triggered by a leaflet event
                $rootScope.$applyAsync(() => _onFinishPolygon(shapeInfo));
            }
        }

        function onChangePolygon () {
            // update the publicly available shape info, applyAsync because triggered by a leaflet event
            $rootScope.$applyAsync(() => updateShapeInfo());
        }

        function setDrawingMode (drawingMode) {
            if (drawTool.drawingMode !== drawingMode) {
                drawTool.drawingMode = drawingMode;
                $rootScope.$applyAsync(() => {
                    // call any registered callback function, applyAsync because triggered by a leaflet event
                    _onDrawingMode(drawingMode);
                });
            }
        }

        // Construct a polygon from a array of coordinates
        function setPolygon (latLngs) {
            deletePolygon();    // delete any existing polygon
            createPolygon(new L.Polygon(latLngs));
        }

        // Create a new polygon by registering the layer, show the layer and register a click handler to start/end edit
        function createPolygon (layer) {
            currentShape.layer = layer;
            drawTool.drawnItems.addLayer(layer);
            layer.on('click', shapeClickHandler);
        }

        // Delete an existing polygon
        function deletePolygon () {
            if (currentShape.layer) {
                currentShape.layer.off('click', shapeClickHandler); // deregister the click handler to start/end edit
                drawTool.drawnItems.removeLayer(currentShape.layer);

                let deletedLayers = new L.LayerGroup();
                deletedLayers.addLayer(currentShape.layer);
                drawTool.map.fire(L.Draw.Event.DELETED, { layers: deletedLayers });

                currentShape.layer = null;
            }
        }

        // Called when a polygon is finished (end draw or end edit)
        function finishPolygon () {
            setDrawingMode(null);
            onFinishPolygon();
        }

        // Click on the shape toggles EDIT mode
        function shapeClickHandler (e) {
            L.DomEvent.stop(e);
            toggle();
        }

        // Initialisation of the draw tool, initialise drawing and register required objects in the drawTool object
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

        // enforce the maximum markers limit and the non-intersection of line segments limit
        function enforceLimits () {
            if (currentShape.markers.length > currentShape.markersMaxCount || currentShape.intersects) {
                currentShape.isConsistent = false;  // undo actions should remain private
                let markersPrev = angular.copy(currentShape.markersPrev);   // restore previous state
                $rootScope.$applyAsync(() => {
                    if (drawTool.drawingMode === 'DRAW') {
                        deleteMarker(getLastDrawnMarker()); // simply delete last marker
                        currentShape.isConsistent = true;
                    } else {
                        deletePolygon();    // delete current polygon
                        $rootScope.$applyAsync(() => {
                            setPolygon(markersPrev);    // restore previous polygon
                            currentShape.isConsistent = true;
                            updateShape();
                        });
                    }
                });
            }
        }

        // Auto close polygon when in drawing mode and max markers has been reached
        function autoClose () {
            if (drawTool.drawShapeHandler._markers.length === currentShape.markersMaxCount) {
                $rootScope.$applyAsync(() => {
                    disable();
                });
            }
        }

        // handle any leaflet.draw event
        function handleDrawEvent (eventName, e) {
            let handlers = {
                DRAWSTART: () => setDrawingMode('DRAW'),
                DRAWVERTEX: () => {
                    autoClose();
                    bindLastDrawnMarker();
                },
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

        // Every leaflet.draw event is catched, thereby taking care that the shape is always up-to-date,
        // that all limits are respected and that the last consistent state gets exposed by the drawing tool
        function registerDrawEvents () {
            Object.keys(L.Draw.Event).forEach(eventName => {
                drawTool.map.on(L.Draw.Event[eventName], function (e) {
                    handleDrawEvent(eventName, e);

                    updateShape();

                    enforceLimits();

                    if (currentShape.isConsistent) {
                        onChangePolygon();
                    }
                });
            });
        }

        // register any non-leaflet.draw events
        function registerOtherEvents () {
            // Click outside shape => delete shape
            drawTool.map.on('click', function () {
                // Not in draw mode (add new marker) or when no shape exists
                if (!(drawTool.drawingMode === 'DRAW' || currentShape.layer === null)) {
                    deletePolygon();
                    onFinishPolygon();
                    disable();
                }
            });
        }

        // toggle between draw/edit (enable) and show mode (null)
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

        // initialise factory; initialise draw tool, register callback methods and register events
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
            let isFirstMarker = drawTool.drawShapeHandler._markers.length === 1;
            ['mousedown', 'click'].forEach(key => lastMarker.on(key, () => {
                if (drawTool.drawShapeHandler.enabled() && isFirstMarker) {
                    disable();
                } else {
                    deleteMarker(lastMarker);
                }
            }));
        }
    }
})();
