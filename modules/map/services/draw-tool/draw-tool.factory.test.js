describe('The draw tool factory', function () {
    let $rootScope,
        L,
        DRAW_TOOL_CONFIG,
        drawTool,
        leafletMap;

    let layerGroup,
        drawnItems,
        drawShapeHandler,
        editShapeHandler,
        modeHandlers,
        editToolbar,
        geometryUtil;

    beforeEach(function () {
        layerGroup = {
            addLayer: angular.noop
        };

        drawnItems = {
            addLayer: angular.noop,
            removeLayer: angular.noop
        };

        editShapeHandler = {
            enabled: angular.noop,
            enable: angular.noop,
            disable: angular.noop,
            save: angular.noop
        };

        modeHandlers = [{
            handler: editShapeHandler
        }];

        editToolbar = {
            getModeHandlers: () => modeHandlers
        };

        drawShapeHandler = {
            enabled: angular.noop,
            deleteLastVertex: angular.noop,
            completeShape: angular.noop,
            disable: angular.noop,
            enable: angular.noop
        };

        geometryUtil = {
            geodesicArea: () => 1,
            readableArea: () => 1,
            readableDistance: () => 1
        };

        angular.mock.module(
            'dpMap',
            {
                L: {
                    LayerGroup: () => layerGroup,
                    FeatureGroup: () => drawnItems,
                    EditToolbar: () => editToolbar,
                    GeometryUtil: geometryUtil,
                    Polygon: angular.noop,
                    Draw: {
                        Polygon: () => drawShapeHandler
                    },
                    DomEvent: {
                        stop: angular.noop
                    }
                }
            }
        );

        angular.mock.inject(function (_$rootScope_, _L_, _DRAW_TOOL_CONFIG_, _drawTool_) {
            $rootScope = _$rootScope_;
            L = _L_;
            DRAW_TOOL_CONFIG = _DRAW_TOOL_CONFIG_;
            drawTool = _drawTool_;
        });

        DRAW_TOOL_CONFIG.MAX_MARKERS = 4;

        leafletMap = {
            addLayer: angular.noop,
            on: angular.noop,
            fire: angular.noop
        };

        spyOn(L, 'LayerGroup').and.returnValue(layerGroup);
        spyOn(L, 'FeatureGroup').and.returnValue(drawnItems);
        spyOn(L, 'EditToolbar').and.returnValue(editToolbar);
        spyOn(L.Draw, 'Polygon').and.returnValue(drawShapeHandler);
        spyOn(L.DomEvent, 'stop');
        spyOn(leafletMap, 'addLayer');
        spyOn(leafletMap, 'on');
        spyOn(leafletMap, 'fire');
        spyOn(layerGroup, 'addLayer');
        spyOn(drawnItems, 'addLayer');
        spyOn(drawnItems, 'removeLayer');
        spyOn(drawShapeHandler, 'enabled');
        spyOn(drawShapeHandler, 'deleteLastVertex');
        spyOn(drawShapeHandler, 'completeShape');
        spyOn(drawShapeHandler, 'enable');
        spyOn(editToolbar, 'getModeHandlers').and.returnValue(modeHandlers);
        spyOn(editShapeHandler, 'enabled');
        spyOn(editShapeHandler, 'enable');
        spyOn(editShapeHandler, 'disable');
        spyOn(editShapeHandler, 'save');
    });

    function fireEventPlain (name, e) {
        let handlers = {};

        for (let i = 0; i < leafletMap.on.calls.count(); i++) {
            let [fname, func] = leafletMap.on.calls.argsFor(i);
            handlers[fname] = func;
        }

        if (handlers[name]) {
            handlers[name](e);
        }
    }

    function fireEvent (name, e) {
        fireEventPlain(name, e);

        $rootScope.$digest();
    }

    // Events
    // 'draw:created'
    // 'draw:edited'
    // 'draw:deleted'
    // 'draw:drawstart'
    // 'draw:drawstop'
    // 'draw:drawvertex'
    // 'draw:editstart'
    // 'draw:editmove'
    // 'draw:editresize'
    // 'draw:editvertex'
    // 'draw:editstop'
    // 'draw:deletestart'
    // 'draw:deletestop'
    // 'click'

    describe('Initialisation', function () {
        beforeEach(function () {
            drawTool.initialize(leafletMap);
            spyOn(drawShapeHandler, 'disable');
        });

        it('disable by default', function () {
            expect(drawTool.isEnabled()).toBe(false);
        });

        it('can be enabled', function () {
            drawTool.enable();
            expect(drawShapeHandler.enable).toHaveBeenCalled();

            fireEvent('draw:drawstart');
            expect(drawTool.isEnabled()).toBe(true);
        });

        it('ignores enable when already enabled', function () {
            drawTool.enable();
            fireEvent('draw:drawstart');
            drawShapeHandler.enable.calls.reset();

            drawTool.enable();
            expect(drawShapeHandler.enable).not.toHaveBeenCalled();
        });

        it('can be disabled', function () {
            drawTool.enable();
            fireEvent('draw:drawstart');

            drawTool.disable();
            expect(drawTool.isEnabled()).toBe(false);
        });

        it('ignores disable when already disabled', function () {
            drawTool.disable();
            expect(drawShapeHandler.disable).not.toHaveBeenCalled();
        });
    });

    describe('On drawing mode changed event', function () {
        let onResult,
            onDrawingMode = status => onResult = status;

        beforeEach(function () {
            drawTool.initialize(leafletMap, null, onDrawingMode);
        });

        it('calls onDrawing when the drawing mode changes, in the next digest cycle', function () {
            drawTool.enable();
            fireEvent('draw:drawstart');
            $rootScope.$digest();

            expect(onResult).toBe('DRAW');
        });
    });

    describe('Draw polygon', function () {
        let nVertices;

        beforeEach(function () {
            nVertices = 3;
            spyOn(L.GeometryUtil, 'readableArea').and.returnValue(1);
            spyOn(L.GeometryUtil, 'readableDistance').and.returnValue(1);
            spyOn(L.GeometryUtil, 'geodesicArea').and.returnValue(1);
        });

        let testMarkers = [[4, 50], [4, 51], [3, 51], [3, 50], [0, 0], [0, 0]];

        let vertices = testMarkers.map(([lat, lng], i) => {
            return {
                _leaflet_id: i,
                handler: {},
                _latlng: {
                    lat,
                    lng,
                    distanceTo: () => 1
                }
            };
        });

        vertices.forEach(v => {
            v.on = (on, func) => v.handler[on] = func;
        });

        function enable () {
            drawTool.enable();
            fireEvent('draw:drawstart');
        }

        function addVertices () {
            let markers = [];
            for (let i = 0; i < nVertices; i++) {
                let v = vertices[i];
                markers.push(v);
                drawShapeHandler._markers = markers;
                fireEvent('draw:drawvertex');
            }
        }

        function buildPolygon () {
            enable();

            addVertices();

            fireEvent('draw:drawstop');
            fireEvent('draw:deleted');  // this is the event that leaflet fires after drawstop
        }

        class Layer {
            constructor (latlngs) {
                this._latlngs = [];
                latlngs.forEach(latlng => this.addVertex(latlng));
            }

            addVertex (latlng) {
                let [lat, lng] = latlng;
                this._latlngs.push({
                    lat,
                    lng,
                    distanceTo: () => 1
                });
            }

            on () { }   // shape click handler

            off () { }

            getLatLngs () {
                return [this._latlngs];
            }

            intersects () { return false; }
        }

        let shapeClickHandler = {};

        let layer = {
            on: (event, handler) => shapeClickHandler[event] = handler,
            off: angular.noop,
            getLatLngs: () => [vertices.map(v => v._latlng).slice(0, nVertices)],
            intersects: () => false
        };

        function createPolygon () {
            buildPolygon();
            fireEvent('draw:created', {
                layer
            });
        }

        function deletePolygon () {
            drawTool.setPolygon([]);
            drawShapeHandler._markers = [];
            fireEvent('draw:deleted');
        }

        beforeEach(function () {
            drawTool.initialize(leafletMap);
        });

        it('Can add a vertex', function () {
            enable();
            drawShapeHandler._markers = [vertices[0]];
            fireEvent('draw:drawvertex');
        });

        it('Can build a polygon', function () {
            drawTool.initialize(leafletMap);
            buildPolygon();
            expect(drawTool.shape.markers).toEqual([[4, 50], [4, 51], [3, 51]]);
        });

        it('Can build a line', function () {
            enable();

            nVertices = 2;
            addVertices();

            expect(drawTool.shape.markers).toEqual([[4, 50], [4, 51]]);
            expect(drawTool.isEnabled()).toBe(true);

            drawShapeHandler.enabled = () => true;
            vertices[0].handler.click();

            expect(drawShapeHandler.completeShape).toHaveBeenCalled();

            drawShapeHandler.enabled = () => false;

            fireEvent('draw:created', {layer});
            $rootScope.$digest();

            fireEvent('draw:drawstop');
            $rootScope.$digest();
        });

        it('Can build a polygon and notifies on finish drawing', function () {
            let onResult,
                onFinish = shape => onResult = shape;
            drawTool.initialize(leafletMap, onFinish);
            buildPolygon();
            expect(onResult.markers).toEqual([[4, 50], [4, 51], [3, 51]]);
        });

        it('Can delete a polygon', function () {
            createPolygon();

            deletePolygon();

            expect(drawTool.shape.markers).toEqual([]);
        });

        it('Can delete the last marker', function () {
            enable();

            addVertices();

            vertices[2].handler.click();
            $rootScope.$digest();

            // TODO expect(drawTool.shape.markers.length).toBe(2);
        });

        it('Can delete the last and nextlast marker', function () {
            enable();

            addVertices();

            vertices[1].handler.click();
            $rootScope.$digest();

            // TODO expect(drawTool.shape.markers.length).toBe(1);
        });

        it('Can delete the first marker', function () {
            nVertices = 1;

            enable();

            addVertices();

            drawShapeHandler.enabled = () => true;

            vertices[0].handler.click();
            $rootScope.$digest();

            // TODO expect(drawTool.shape.markers.length).toBe(0);
        });

        it ('Auto closes a polygon', function () {
            enable();

            nVertices = 4;
            addVertices();
            $rootScope.$digest();

            expect(drawTool.isEnabled()).toBe(false);
        });

        it('can edit a polygon by clicking the drawn polygon', function () {
            createPolygon();

            expect(shapeClickHandler.click).toEqual(jasmine.any(Function));

            shapeClickHandler.click();

            expect(editShapeHandler.enable).toHaveBeenCalled();
            fireEvent('draw:editstart');

            shapeClickHandler.click();
            expect(editShapeHandler.disable).toHaveBeenCalled();
        });

        it('can edit a polygon', function () {
            createPolygon();

            drawTool.enable();
            expect(editShapeHandler.enable).toHaveBeenCalled();

            fireEvent('draw:editstart');
            $rootScope.$digest();

            drawTool.disable();

            expect(editShapeHandler.save).toHaveBeenCalled();
            expect(editShapeHandler.disable).toHaveBeenCalled();
        });

        it('can add markers to a polygon in edit mode', function () {
            createPolygon();

            drawTool.enable();
            fireEvent('draw:editstart');
            $rootScope.$digest();

            nVertices = 4;  // layer.getLatlngs() response

            fireEvent('draw:editstop');
            expect(drawTool.shape.markers.length).toBe(4);
        });

        it('does not let a polygon exceed max markers in edit mode', function () {
            L.Polygon = Layer;

            spyOn(drawShapeHandler, 'disable').and.callFake(() => fireEvent('draw:drawstop'));
            // spyOn(drawShapeHandler, 'completeShape').and.callFake(() => fireEvent('draw:created'));

            drawTool.enable();
            fireEvent('draw:drawstart');

            nVertices = DRAW_TOOL_CONFIG.MAX_MARKERS;
            addVertices();

            expect(drawShapeHandler.completeShape).toHaveBeenCalled();
            expect(drawTool.isEnabled()).toBe(false);
            expect(drawTool.shape.markers.length).toBe(4);

            fireEvent('draw:created', {
                layer
            });

            fireEvent('draw:drawstop');

            expect(drawTool.shape.markers.length).toBe(4);

            drawTool.enable();
            fireEvent('draw:editstart');

            expect(editShapeHandler.enable).toHaveBeenCalled();

            nVertices = 5;  // layer.getLatlngs() response
            fireEvent('draw:editvertex');

            expect(drawTool.shape.markers.length).toBe(4);
        });

        it('click on map while drawing polygon does not end draw mode', function () {
            enable();

            addVertices();

            fireEvent('click');

            expect(drawTool.isEnabled()).toBe(true);
        });

        it('click on map while finished drawing polygon deletes polygon', function () {
            createPolygon();

            fireEvent('click');

            deletePolygon();

            expect(drawTool.isEnabled()).toBe(false);
            expect(drawTool.shape.markers.length).toBe(0);
        });

        it('click on map while editing polygon ends edit mode', function () {
            createPolygon();

            drawTool.enable();
            fireEvent('draw:editstart');

            fireEvent('click');

            expect(drawTool.isEnabled()).toBe(false);
        });
    });

    describe('Leaflet.draw events', function () {
        beforeEach(function () {
            drawTool.initialize(leafletMap);
        });
    });

    describe('Set polygon', function () {
        beforeEach(function () {
            drawTool.initialize(leafletMap);
        });

        it('deletes any existing polygon', function () {

        });

        it('does not create a new polygon for empty markers', function () {
            drawTool.setPolygon([]);
            expect(drawnItems.addLayer).not.toHaveBeenCalled();
        });

        it('creates a new polygon for the specified markers', function () {
            let markers = [[4, 50], [4, 51], [3, 51]];
            drawTool.setPolygon(markers);
            expect(drawnItems.addLayer).toHaveBeenCalled();
        });
    });
});

xdescribe('The draw tool factory', () => {
    let store,
        ACTIONS,
        L,
        drawTool,
        DRAW_TOOL_CONFIG,
        map,
        layerGroup,
        drawnItems,
        drawShapeHandler,
        editToolbar,
        editShapeHandler,
        modeHandlers;

    beforeEach(() => {
        angular.mock.module(
            'dpMap',
            {
                store: {
                    getState: angular.noop,
                    subscribe: angular.noop,
                    dispatch: angular.noop
                },
                L: {
                    LayerGroup: angular.noop,
                    FeatureGroup: angular.noop,
                    EditToolbar: angular.noop,
                    Draw: {
                        Polygon: angular.noop
                    },
                    DomEvent: {
                        stop: angular.noop
                    }
                }
            }
        );

        angular.mock.inject((_store_, _L_, _drawTool_, _DRAW_TOOL_CONFIG_, _ACTIONS_) => {
            store = _store_;
            L = _L_;
            drawTool = _drawTool_;
            DRAW_TOOL_CONFIG = _DRAW_TOOL_CONFIG_;
            ACTIONS = _ACTIONS_;
        });

        map = {
            addLayer: angular.noop,
            on: angular.noop,
            fire: angular.noop
        };

        layerGroup = {
            addLayer: angular.noop
        };

        drawnItems = {
            addLayer: angular.noop,
            removeLayer: angular.noop
        };

        drawShapeHandler = {
            enabled: angular.noop,
            deleteLastVertex: angular.noop,
            completeShape: angular.noop,
            disable: angular.noop,
            enable: angular.noop
        };

        editToolbar = {
            getModeHandlers: angular.noop
        };

        editShapeHandler = {
            enabled: angular.noop,
            enable: angular.noop,
            disable: angular.noop,
            save: angular.noop
        };

        modeHandlers = [{
            handler: editShapeHandler
        }];

        spyOn(store, 'getState');
        spyOn(store, 'subscribe');
        spyOn(store, 'dispatch');
        spyOn(L, 'LayerGroup').and.returnValue(layerGroup);
        spyOn(L, 'FeatureGroup').and.returnValue(drawnItems);
        spyOn(L, 'EditToolbar').and.returnValue(editToolbar);
        spyOn(L.Draw, 'Polygon').and.returnValue(drawShapeHandler);
        spyOn(L.DomEvent, 'stop');
        spyOn(map, 'addLayer');
        spyOn(map, 'on');
        spyOn(map, 'fire');
        spyOn(layerGroup, 'addLayer');
        spyOn(drawnItems, 'addLayer');
        spyOn(drawnItems, 'removeLayer');
        spyOn(drawShapeHandler, 'enabled');
        spyOn(drawShapeHandler, 'deleteLastVertex');
        spyOn(drawShapeHandler, 'completeShape');
        spyOn(drawShapeHandler, 'disable');
        spyOn(drawShapeHandler, 'enable');
        spyOn(editToolbar, 'getModeHandlers').and.returnValue(modeHandlers);
        spyOn(editShapeHandler, 'enabled');
        spyOn(editShapeHandler, 'enable');
        spyOn(editShapeHandler, 'disable');
        spyOn(editShapeHandler, 'save');

        drawTool.initialize(map);
    });

    xit('subscribes to the store', () => {
        expect(store.subscribe).toHaveBeenCalledTimes(1);
        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('creates a draw handler', () => {
        expect(L.FeatureGroup).toHaveBeenCalledTimes(1);
        expect(L.Draw.Polygon).toHaveBeenCalledTimes(1);
        expect(L.Draw.Polygon).toHaveBeenCalledWith(map, DRAW_TOOL_CONFIG.draw.polygon);
    });

    it('creates an edit handler', () => {
        let editConfig = angular.copy(DRAW_TOOL_CONFIG.edit);
        editConfig.featureGroup = drawnItems;

        expect(L.EditToolbar).toHaveBeenCalledTimes(1);
        expect(L.EditToolbar).toHaveBeenCalledWith(editConfig);
        expect(editToolbar.getModeHandlers).toHaveBeenCalledTimes(1);
        expect(editToolbar.getModeHandlers).toHaveBeenCalledWith(map);
    });

    it('adds a new layer to the map', () => {
        expect(map.addLayer).toHaveBeenCalledWith(drawnItems);
    });

    it('will bind four events to the map', () => {
        expect(map.on).toHaveBeenCalledTimes(14);
    });

    describe('enabling and disabling', () => {
        beforeEach(() => {
        });

        it('is disabled by default', () => {
            expect(drawShapeHandler.enable).not.toHaveBeenCalled();
            expect(drawShapeHandler.disable).not.toHaveBeenCalled();
            expect(editShapeHandler.enable).not.toHaveBeenCalled();
            expect(editShapeHandler.disable).not.toHaveBeenCalled();
        });

        it('enables the drawing tool when enabled', () => {
            drawShapeHandler.enabled.and.returnValue(false);
            drawShapeHandler.enable.and.callFake(() => {
                drawShapeHandler.enabled.and.returnValue(true);
            });
            editShapeHandler.enabled.and.returnValue(false);

            drawTool.enable();

            expect(drawShapeHandler.enable).toHaveBeenCalledTimes(1);
            expect(drawShapeHandler.disable).not.toHaveBeenCalled();
            expect(editShapeHandler.enable).not.toHaveBeenCalled();
            expect(editShapeHandler.disable).not.toHaveBeenCalled();
        });

        ['DRAW', 'EDIT', true].forEach((drawingMode) => {
            xit(`leaves the drawing tool enabled when the drawing mode in the state is set to ${drawingMode}`, () => {
                // Drawing
                drawShapeHandler.enabled.and.returnValue(true);
                editShapeHandler.enabled.and.returnValue(false);

                drawTool.enable();

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                expect(editShapeHandler.enable).not.toHaveBeenCalled();
                expect(editShapeHandler.disable).not.toHaveBeenCalled();
                expect(store.dispatch).not.toHaveBeenCalled();

                // Editing
                drawShapeHandler.enable.calls.reset();
                drawShapeHandler.disable.calls.reset();
                editShapeHandler.enable.calls.reset();
                editShapeHandler.disable.calls.reset();
                store.dispatch.calls.reset();

                drawShapeHandler.enabled.and.returnValue(false);
                editShapeHandler.enabled.and.returnValue(true);

                drawTool.disable();

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                expect(editShapeHandler.enable).not.toHaveBeenCalled();
                expect(editShapeHandler.disable).not.toHaveBeenCalled();
            });
        });

        [false, null, undefined].forEach((drawingMode) => {
            xit(`disables the drawing tool when the drawing mode in the state is set to ${drawingMode}`, () => {
                // Drawing
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler.disable.and.callFake(() => {
                    drawShapeHandler.enabled.and.returnValue(false);
                });
                editShapeHandler.enabled.and.returnValue(false);
                // state.map.drawingMode = drawingMode;

                // subscriptionHandler();

                expect(drawShapeHandler.disable).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.MAP_SET_DRAWING_MODE,
                    payload: null
                });

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(editShapeHandler.enable).not.toHaveBeenCalled();
                expect(editShapeHandler.disable).not.toHaveBeenCalled();

                // Editing
                drawShapeHandler.enable.calls.reset();
                drawShapeHandler.disable.calls.reset();
                editShapeHandler.enable.calls.reset();
                editShapeHandler.disable.calls.reset();
                store.dispatch.calls.reset();

                drawShapeHandler.enabled.and.returnValue(false);
                editShapeHandler.enabled.and.returnValue(true);
                editShapeHandler.disable.and.callFake(() => {
                    editShapeHandler.enabled.and.returnValue(false);
                });
                // state.map.drawingMode = drawingMode;

                // subscriptionHandler();

                expect(editShapeHandler.disable).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.MAP_SET_DRAWING_MODE,
                    payload: null
                });

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                expect(editShapeHandler.enable).not.toHaveBeenCalled();
            });
        });
    });

    describe('polygon created event handler', () => {
        let createdHandler;
        let newLayer;

        beforeEach(() => {
            createdHandler = map.on.calls.argsFor(3)[1];
            newLayer = {
                on: angular.noop
            };
            spyOn(newLayer, 'on');
        });

        xit('will be bound to the map', () => {
            expect(map.on).toHaveBeenCalledWith(L.Draw.Event.CREATED, jasmine.any(Function));
        });

        xit('will add a polygon layer', () => {
            createdHandler({
                layerType: 'polygon',
                layer: newLayer
            });

            expect(drawnItems.addLayer).toHaveBeenCalledTimes(1);
            expect(drawnItems.addLayer).toHaveBeenCalledWith(newLayer);
        });

        xit('will do nothing with layer types other than polygon', () => {
            createdHandler({
                layerType: 'polyline',
                layer: newLayer
            });

            expect(drawnItems.addLayer).not.toHaveBeenCalled();

            createdHandler({
                layerType: null,
                layer: newLayer
            });

            expect(drawnItems.addLayer).not.toHaveBeenCalled();

            createdHandler({
                layer: newLayer
            });

            expect(drawnItems.addLayer).not.toHaveBeenCalled();
        });

        describe('polygon clicked event handler', () => {
            let clickHandler;

            beforeEach(() => {
                createdHandler({
                    layerType: 'polygon',
                    layer: newLayer
                });

                clickHandler = newLayer.on.calls.first().args[1];
            });

            xit('it will be bound to the new layer', () => {
                expect(newLayer.on).toHaveBeenCalledTimes(1);
                expect(newLayer.on).toHaveBeenCalledWith('click', jasmine.any(Function));
            });

            xit('will stop propagation of the click event', () => {
                clickHandler('clickEvent');

                expect(L.DomEvent.stop).toHaveBeenCalledTimes(1);
                expect(L.DomEvent.stop).toHaveBeenCalledWith('clickEvent');
            });

            xit('toggles edit mode', () => {
                // Turn on
                drawShapeHandler.enabled.and.returnValue(false);
                editShapeHandler.enabled.and.returnValue(false);
                editShapeHandler.enable.and.callFake(() => {
                    editShapeHandler.enabled.and.returnValue(true);
                });

                clickHandler();

                expect(editShapeHandler.enable).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.MAP_SET_DRAWING_MODE,
                    payload: 'EDIT'
                });

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                expect(editShapeHandler.disable).not.toHaveBeenCalled();

                // Turn off
                drawShapeHandler.enable.calls.reset();
                drawShapeHandler.disable.calls.reset();
                editShapeHandler.enable.calls.reset();
                editShapeHandler.disable.calls.reset();
                store.dispatch.calls.reset();

                editShapeHandler.enabled.and.returnValue(true);
                editShapeHandler.disable.and.callFake(() => {
                    editShapeHandler.enabled.and.returnValue(false);
                });

                clickHandler();

                expect(editShapeHandler.disable).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.MAP_SET_DRAWING_MODE,
                    payload: null
                });

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                expect(editShapeHandler.enable).not.toHaveBeenCalled();

                // Turn on again
                drawShapeHandler.enable.calls.reset();
                drawShapeHandler.disable.calls.reset();
                editShapeHandler.enable.calls.reset();
                editShapeHandler.disable.calls.reset();
                store.dispatch.calls.reset();

                editShapeHandler.enabled.and.returnValue(false);
                editShapeHandler.enable.and.callFake(() => {
                    editShapeHandler.enabled.and.returnValue(true);
                });

                clickHandler();

                expect(editShapeHandler.enable).toHaveBeenCalledTimes(1);
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.MAP_SET_DRAWING_MODE,
                    payload: 'EDIT'
                });

                expect(drawShapeHandler.enable).not.toHaveBeenCalled();
                expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                expect(editShapeHandler.disable).not.toHaveBeenCalled();
            });
        });
    });

    describe('vertex created event handler', () => {
        let createdHandler,
            clickHandlers = [],
            vertices = [{
                on: angular.noop,
                off: angular.noop
            }, {
                on: angular.noop,
                off: angular.noop
            }, {
                on: angular.noop,
                off: angular.noop
            }];

        beforeEach(() => {
            createdHandler = map.on.calls.argsFor(2)[1];

            vertices.forEach(vertex => {
                spyOn(vertex, 'on');
                spyOn(vertex, 'off');
            });
        });

        xit('will be bound to the map', () => {
            expect(map.on).toHaveBeenCalledWith(L.Draw.Event.DRAWVERTEX, jasmine.any(Function));
        });

        describe('delete vertex event handler', () => {
            xit('will be bound to the last vertex', () => {
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();

                // will also be called to bind to complete shape
                expect(vertices[0].on).toHaveBeenCalledTimes(2);
                expect(vertices[0].on.calls.argsFor(0)).toEqual(['click', jasmine.any(Function)]);
                expect(vertices[0].on.calls.argsFor(1)).toEqual(['click', jasmine.any(Function)]);

                // Second vertex
                drawShapeHandler._markers[1] = vertices[1];
                createdHandler();

                expect(vertices[1].on).toHaveBeenCalledTimes(1);
                expect(vertices[1].on).toHaveBeenCalledWith('click', jasmine.any(Function));

                // Third vertex
                drawShapeHandler._markers[2] = vertices[2];
                createdHandler();

                expect(vertices[2].on).toHaveBeenCalledTimes(1);
                expect(vertices[2].on).toHaveBeenCalledWith('click', jasmine.any(Function));
            });

            xit('will be unbound from the previous vertices', () => {
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();

                // Second vertex (unbind from first)
                drawShapeHandler._markers[1] = vertices[1];
                createdHandler();

                expect(vertices[0].off).toHaveBeenCalledTimes(1);
                expect(vertices[0].off).toHaveBeenCalledWith('click', jasmine.any(Function));

                // Third vertex (unbind from second)
                drawShapeHandler._markers[2] = vertices[2];
                createdHandler();

                expect(vertices[1].off).toHaveBeenCalledTimes(1);
                expect(vertices[1].off).toHaveBeenCalledWith('click', jasmine.any(Function));
            });

            xit('will not be bound in the corner case of the draw handler not being enabled', () => {
                // Disable draw tool
                drawShapeHandler.enabled.and.returnValue(false);

                drawShapeHandler._markers = [vertices[0]];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();
            });

            xit('will not be bound in the corner case of the draw handler having no vertices', () => {
                // Disable draw tool
                drawShapeHandler.enabled.and.returnValue(false);

                // Empty array
                drawShapeHandler._markers = [];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // null
                drawShapeHandler._markers = null;
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // undefined
                delete drawShapeHandler._markers;
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();
            });

            xit('will not be bound in the corner case of the last vertex being falsy', () => {
                drawShapeHandler.enabled.and.returnValue(true);

                // false
                drawShapeHandler._markers = [false];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // 0
                drawShapeHandler._markers = [0];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // ''
                drawShapeHandler._markers = [''];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // null
                drawShapeHandler._markers = [null];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();
            });

            xit('will delete the last vertex, unbind itself and rebind the previous vertex', () => {
                drawShapeHandler.deleteLastVertex.and.callFake(() => {
                    drawShapeHandler._markers.length--;
                });
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();

                // Second vertex
                drawShapeHandler._markers[1] = vertices[1];
                createdHandler();
                clickHandlers[1] = vertices[1].on.calls.first().args[1];

                // Third vertex
                drawShapeHandler._markers[2] = vertices[2];
                createdHandler();
                clickHandlers[2] = vertices[2].on.calls.first().args[1];

                // Delete third vertex
                vertices[1].on.calls.reset();
                clickHandlers[2]();
                expect(drawShapeHandler.deleteLastVertex).toHaveBeenCalledTimes(1);
                expect(vertices[2].off).toHaveBeenCalledTimes(1);
                expect(vertices[2].off).toHaveBeenCalledWith('click', jasmine.any(Function));
                expect(vertices[1].on).toHaveBeenCalledTimes(1);
                expect(vertices[1].on).toHaveBeenCalledWith('click', jasmine.any(Function));

                // Delete second vertex
                vertices[0].on.calls.reset();
                clickHandlers[1]();

                expect(drawShapeHandler.deleteLastVertex).toHaveBeenCalledTimes(2);
                expect(vertices[1].off).toHaveBeenCalledWith('click', jasmine.any(Function));
                expect(vertices[0].on).toHaveBeenCalledTimes(1);
                expect(vertices[0].on).toHaveBeenCalledWith('click', jasmine.any(Function));
            });

            xit('will delete the first (and last) and only vertex by disabling and enabling the draw tool', () => {
                drawShapeHandler.disable.and.callFake(() => {
                    drawShapeHandler._markers.length--;
                    drawShapeHandler.enabled.and.returnValue(false);
                });
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();
                clickHandlers[0] = vertices[0].on.calls.first().args[1];

                drawShapeHandler.enable.calls.reset();
                drawShapeHandler.disable.calls.reset();
                clickHandlers[0]();

                expect(drawShapeHandler.enable).toHaveBeenCalledTimes(1);
                expect(drawShapeHandler.disable).toHaveBeenCalledTimes(1);
            });

            xit('will not delete the last vertex in the corner case of the draw handler not being enabled', () => {
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();

                // Second vertex
                drawShapeHandler._markers[1] = vertices[1];
                createdHandler();
                clickHandlers[1] = vertices[1].on.calls.first().args[1];

                // Disable draw tool
                drawShapeHandler.enabled.and.returnValue(false);

                // Delete second vertex
                vertices[0].on.calls.reset();
                clickHandlers[1]();

                expect(drawShapeHandler.deleteLastVertex).not.toHaveBeenCalled();
                expect(vertices[1].off).not.toHaveBeenCalled();
                expect(vertices[0].on).not.toHaveBeenCalled();
            });

            xit('will not delete the last vertex in the corner case of there being no vertices', () => {
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();

                // Second vertex
                drawShapeHandler._markers[1] = vertices[1];
                createdHandler();
                clickHandlers[1] = vertices[1].on.calls.first().args[1];

                // Empty array
                drawShapeHandler._markers = [];

                // Delete second vertex
                vertices[0].on.calls.reset();
                clickHandlers[1]();

                expect(drawShapeHandler.deleteLastVertex).not.toHaveBeenCalled();
                expect(vertices[1].off).not.toHaveBeenCalled();
                expect(vertices[0].on).not.toHaveBeenCalled();
            });

            xit('will not be bound in the corner case of the draw handler having no vertices', () => {
                // Empty array
                drawShapeHandler.enabled.and.returnValue(false);
                drawShapeHandler._markers = [];
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // null
                drawShapeHandler._markers = null;
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();

                // undefined
                delete drawShapeHandler._markers;
                createdHandler();

                expect(vertices[0].on).not.toHaveBeenCalled();
            });
        });

        describe('complete shape by clicking on the first vertex event handler', () => {
            [() => {
                // Create the first vertex
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();
                clickHandlers[0] = vertices[0].on.calls.argsFor(1)[1];
            }, () => {
                // Create two vertices and then remove the second
                drawShapeHandler.enabled.and.returnValue(true);
                drawShapeHandler._markers = [vertices[0]];
                createdHandler();
                clickHandlers[0] = vertices[0].on.calls.argsFor(1)[1];

                // Second vertex
                drawShapeHandler._markers[1] = vertices[1];
                createdHandler();
                clickHandlers[1] = vertices[1].on.calls.first().args[1];

                // Remove second vertex
                clickHandlers[1]();
                drawShapeHandler._markers.length--;
                clickHandlers.length--;
            }].forEach(beforeEachFn => {
                beforeEach(beforeEachFn);

                xit('will do nothing when it is the only vertex', () => {
                    // Completing the shape will be handled by Leaflet draw

                    // Click on first vertex
                    drawShapeHandler.completeShape.calls.reset();
                    drawShapeHandler.disable.calls.reset();
                    clickHandlers[0]();

                    expect(drawShapeHandler.completeShape).not.toHaveBeenCalled();
                    expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                });

                xit('will complete the polygon by disabling the draw tool with exactly two vertices', () => {
                    // When there are more than two vertices Leaflet draw will
                    // complete the shape.
                    // In case there are exactly two vertices Leaflet draw will not
                    // allow you to complete the shape because the lines are not
                    // allowed to cross.
                    // To prevent this last error, we will call completeShape on
                    // the drawHandler manually which will automatically complete
                    // the shape for us. And in this case without an error.

                    // Second vertex
                    drawShapeHandler._markers[1] = vertices[1];
                    createdHandler();

                    // Click on first vertex
                    drawShapeHandler.completeShape.calls.reset();
                    drawShapeHandler.disable.calls.reset();
                    clickHandlers[0]();

                    expect(drawShapeHandler.completeShape).toHaveBeenCalledTimes(1);
                    expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                });

                xit('will do nothing when there are more than two vertices', () => {
                    // Completing the shape will be handled by Leaflet draw

                    // Second vertex
                    drawShapeHandler._markers[1] = vertices[1];
                    createdHandler();

                    // Third vertex
                    drawShapeHandler._markers[2] = vertices[2];
                    createdHandler();

                    // Click on first vertex
                    drawShapeHandler.completeShape.calls.reset();
                    drawShapeHandler.disable.calls.reset();
                    clickHandlers[0]();

                    expect(drawShapeHandler.completeShape).not.toHaveBeenCalled();
                    expect(drawShapeHandler.disable).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('draw stop event handler', () => {
        let stopHandler;

        beforeEach(() => {
            stopHandler = map.on.calls.argsFor(1)[1];
        });

        xit('will be bound to the map', () => {
            expect(map.on).toHaveBeenCalledWith(L.Draw.Event.DRAWSTOP, jasmine.any(Function));
        });

        xit('will dispatch an action with payload null to reset the drawing mode', () => {
            stopHandler();
            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.MAP_SET_DRAWING_MODE,
                payload: null
            });
        });
    });

    describe('click on map', () => {
        let clickHandler,
            createdHandler,
            layerClickHandler,
            newLayer;

        beforeEach(() => {
            clickHandler = map.on.calls.argsFor(0)[1];
            createdHandler = map.on.calls.argsFor(3)[1];
            newLayer = {
                on: angular.noop,
                off: angular.noop
            };
            spyOn(newLayer, 'on');
            spyOn(newLayer, 'off');
        });

        xit('will be bound to the map', () => {
            expect(map.on).toHaveBeenCalledWith('click', jasmine.any(Function));
        });

        xit('deletes the polygon layer', () => {
            createdHandler({
                layerType: 'polygon',
                layer: newLayer
            });
            layerClickHandler = newLayer.on.calls.first().args[1];

            // Click on map
            clickHandler();

            expect(L.LayerGroup).toHaveBeenCalledTimes(1);
            expect(newLayer.off).toHaveBeenCalledTimes(1);
            expect(newLayer.off).toHaveBeenCalledWith('click', layerClickHandler);
            expect(drawnItems.removeLayer).toHaveBeenCalledTimes(1);
            expect(drawnItems.removeLayer).toHaveBeenCalledWith(newLayer);
            expect(layerGroup.addLayer).toHaveBeenCalledTimes(1);
            expect(layerGroup.addLayer).toHaveBeenCalledWith(newLayer);
            expect(map.fire).toHaveBeenCalledTimes(1);
            expect(map.fire).toHaveBeenCalledWith(L.Draw.Event.DELETED, {
                layers: layerGroup
            });
        });

        xit('deletes the polygon layer while in edit mode', () => {
            editShapeHandler.enabled.and.returnValue(true);
            createdHandler({
                layerType: 'polygon',
                layer: newLayer
            });
            layerClickHandler = newLayer.on.calls.first().args[1];

            // Click on map
            clickHandler();

            expect(L.LayerGroup).toHaveBeenCalledTimes(1);
            expect(newLayer.off).toHaveBeenCalledTimes(1);
            expect(newLayer.off).toHaveBeenCalledWith('click', layerClickHandler);
            expect(drawnItems.removeLayer).toHaveBeenCalledTimes(1);
            expect(drawnItems.removeLayer).toHaveBeenCalledWith(newLayer);
            expect(layerGroup.addLayer).toHaveBeenCalledTimes(1);
            expect(layerGroup.addLayer).toHaveBeenCalledWith(newLayer);
            expect(map.fire).toHaveBeenCalledTimes(1);
            expect(map.fire).toHaveBeenCalledWith(L.Draw.Event.DELETED, {
                layers: layerGroup
            });
        });

        xit('does nothing when in draw mode', () => {
            drawShapeHandler.enabled.and.returnValue(true);

            // Click on map
            clickHandler();

            expect(L.LayerGroup).not.toHaveBeenCalled();
            expect(newLayer.off).not.toHaveBeenCalled();
            expect(drawnItems.removeLayer).not.toHaveBeenCalled();
            expect(layerGroup.addLayer).not.toHaveBeenCalled();
            expect(map.fire).not.toHaveBeenCalled();
        });

        xit('does nothing when there is no polygon', () => {
            // Click on map
            clickHandler();

            expect(L.LayerGroup).not.toHaveBeenCalled();
            expect(newLayer.off).not.toHaveBeenCalled();
            expect(drawnItems.removeLayer).not.toHaveBeenCalled();
            expect(layerGroup.addLayer).not.toHaveBeenCalled();
            expect(map.fire).not.toHaveBeenCalled();
        });
    });
});
