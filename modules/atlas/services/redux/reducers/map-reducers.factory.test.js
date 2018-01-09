describe('The map reducers', function () {
    var mapReducers,
        ACTIONS,
        DEFAULT_STATE,
        DRAW_TOOL_CONFIG;

    DEFAULT_STATE = {
        map: {
            baseLayer: 'topografie',
            overlays: [],
            viewCenter: [52.3719, 4.9012],
            zoom: 9,
            isLoading: false
        },
        filters: {},
        search: null,
        page: {
            name: 'home'
        },
        detail: null,
        straatbeeld: null,
        dataSelection: null,
        atlas: {
            isPrintMode: false
        },
        ui: {
            isMapPanelVisible: false,
            isMapFullscreen: false
        }
    };

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_mapReducers_, _ACTIONS_, _DRAW_TOOL_CONFIG_) {
            mapReducers = _mapReducers_;
            ACTIONS = _ACTIONS_;
            DRAW_TOOL_CONFIG = _DRAW_TOOL_CONFIG_;
        });
    });

    describe('SHOW_MAP', () => {
        it('makes the map fullscreen', () => {
            const inputState = angular.copy(DEFAULT_STATE);
            const output = mapReducers[ACTIONS.SHOW_MAP.id](inputState);

            expect(output.ui.isMapFullscreen).toBe(true);
            expect(output.ui.isMapPanelVisible).toBe(true);
        });

        it('when map and map panel are not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;
            inputState.ui = null;

            const output = mapReducers[ACTIONS.SHOW_MAP.id](inputState);
            expect(output.map).toBeNull();
            expect(output.ui).toBeNull();
        });
    });

    describe('MAP_ADD_PANO_OVERLAY', function () {
        it('adds a pano overlay', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.straatbeeld = { history: 2020 };

            const output = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(1);
            expect(output.map.overlays[0].isVisible).toBe(true);
            expect(output.map.overlays[0].id).toBe('pano2020');
        });

        it('defaults to \'pano\' when no history selection exists', function () {
            const inputState = angular.copy(DEFAULT_STATE);

            const output = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(1);
            expect(output.map.overlays[0].isVisible).toBe(true);
            expect(output.map.overlays[0].id).toBe('pano');

            // With existing straatbeeld but without history
            inputState.straatbeeld = {};

            const outputStraatbeeld = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(outputStraatbeeld.map.overlays.length).toBe(1);
            expect(outputStraatbeeld.map.overlays[0].isVisible).toBe(true);
            expect(outputStraatbeeld.map.overlays[0].id).toBe('pano');
        });

        it('removes any pre-existing pano layers', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.overlays.push({
                id: 'pano2020',
                isVisible: true
            });

            const output = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(1);
            expect(output.map.overlays[0].isVisible).toBe(true);
            expect(output.map.overlays[0].id).toBe('pano');

            // With multiple pre-existing pano layers
            inputState.map.overlays.push({
                id: 'pano',
                isVisible: true
            });
            inputState.straatbeeld = { history: 2016 };

            const outputMultiple = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(outputMultiple.map.overlays.length).toBe(1);
            expect(outputMultiple.map.overlays[0].isVisible).toBe(true);
            expect(outputMultiple.map.overlays[0].id).toBe('pano2016');
        });

        it('does not add an already active layer', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.overlays.push({
                id: 'pano',
                isVisible: true
            });

            const output = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(1);
            expect(output.map.overlays[0].isVisible).toBe(true);
            expect(output.map.overlays[0].id).toBe('pano');
        });

        it('appends to other active layers', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.overlays.push({
                id: 'a',
                isVisible: true
            });

            const output = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays).toEqual([{
                id: 'a',
                isVisible: true
            }, {
                id: 'pano',
                isVisible: true
            }]);

            // With pano overlay and other overlays
            inputState.map.overlays.push({
                id: 'pano2016',
                isVisible: true
            });
            inputState.map.overlays.push({
                id: 'b',
                isVisible: false
            });

            const outputOthers = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(outputOthers.map.overlays).toEqual([{
                id: 'a',
                isVisible: true
            }, {
                id: 'b',
                isVisible: false
            }, {
                id: 'pano',
                isVisible: true
            }]);

            // With pano overlays and another overlay
            inputState.map.overlays.push({
                id: 'pano2018',
                isVisible: true
            });
            inputState.map.overlays.shift();

            const outputOther = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(outputOther.map.overlays).toEqual([{
                id: 'b',
                isVisible: false
            }, {
                id: 'pano',
                isVisible: true
            }]);
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_REMOVE_PANO_OVERLAY', function () {
        it('removes the active pano overlay', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.overlays.push({
                id: 'pano',
                isVisible: true
            });

            const output = mapReducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(0);
        });

        it('removes all active pano overlays', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.overlays.push({
                id: 'pano',
                isVisible: true
            });
            inputState.map.overlays.push({
                id: 'pano2020',
                isVisible: true
            });

            const output = mapReducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(0);
        });

        it('leaves other active overlays be', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.overlays.push({
                id: 'a',
                isVisible: true
            });
            inputState.map.overlays.push({
                id: 'pano2016',
                isVisible: true
            });
            inputState.map.overlays.push({
                id: 'b',
                isVisible: false
            });
            inputState.map.overlays.push({
                id: 'pano2019',
                isVisible: true
            });
            inputState.map.overlays.push({
                id: 'c',
                isVisible: true
            });

            const output = mapReducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays).toEqual([{
                id: 'a',
                isVisible: true
            }, {
                id: 'b',
                isVisible: false
            }, {
                id: 'c',
                isVisible: true
            }]);
        });

        it('does nothing when there are no active pano overlays', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            const output = mapReducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id](inputState);
            expect(output.map.overlays.length).toBe(0);

            // With other active overlays
            inputState.map.overlays.push({
                id: 'a',
                isVisible: false
            });
            inputState.map.overlays.push({
                id: 'b',
                isVisible: true
            });
            inputState.map.overlays.push({
                id: 'c',
                isVisible: false
            });

            const outputWithLayers = mapReducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id](inputState);
            expect(outputWithLayers.map.overlays).toEqual([{
                id: 'a',
                isVisible: false
            }, {
                id: 'b',
                isVisible: true
            }, {
                id: 'c',
                isVisible: false
            }]);
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_PAN', function () {
        it('updates the viewCenter', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            output = mapReducers[ACTIONS.MAP_PAN.id](inputState, [51.1, 4.1]);
            expect(output.map.viewCenter).toEqual([51.1, 4.1]);

            output = mapReducers[ACTIONS.MAP_PAN.id](inputState, [51.2, 4.2]);
            expect(output.map.viewCenter).toEqual([51.2, 4.2]);
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_PAN.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_ZOOM', function () {
        it('can update the zoom and viewCenter property', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            output = mapReducers[ACTIONS.MAP_ZOOM.id](inputState, {
                viewCenter: [4.9012, 52.3719],
                zoom: 8
            });
            expect(output.map.viewCenter).toEqual([4.9012, 52.3719]);
            expect(output.map.zoom).toBe(8);

            output = mapReducers[ACTIONS.MAP_ZOOM.id](inputState, {
                viewCenter: [52.3719, 4.9012],
                zoom: 15
            });
            expect(output.map.viewCenter).toEqual([52.3719, 4.9012]);
            expect(output.map.zoom).toBe(15);

            output = mapReducers[ACTIONS.MAP_ZOOM.id](inputState, {
                viewCenter: [53, 5],
                zoom: 16
            });
            expect(output.map.viewCenter).toEqual([53, 5]);
            expect(output.map.zoom).toBe(16);
        });

        it('doesn\'t have to update the optional viewCenter property', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            output = mapReducers[ACTIONS.MAP_ZOOM.id](inputState, {
                zoom: 8
            });
            expect(output.map.viewCenter).toEqual([52.3719, 4.9012]);
            expect(output.map.zoom).toBe(8);
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_ZOOM.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_HIGHLIGHT', function () {
        it('can toggle the fullscreen mode', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            let output;

            // Enable fullscreen
            output = mapReducers[ACTIONS.MAP_HIGHLIGHT.id](inputState, true);
            expect(output.map.highlight).toBe(true);

            // Disable fullscreen
            output = mapReducers[ACTIONS.MAP_HIGHLIGHT.id](inputState, false);
            expect(output.map.highlight).toBe(false);
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_HIGHLIGHT.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_START_DRAWING', function () {
        it('Set the map drawing mode to draw and not to reset dataSelection', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = 'leave this as it is';
            output = mapReducers[ACTIONS.MAP_START_DRAWING.id](inputState, DRAW_TOOL_CONFIG.DRAWING_MODE.DRAW);
            expect(output.map.drawingMode).toBe(DRAW_TOOL_CONFIG.DRAWING_MODE.DRAW);
            expect(output.dataSelection).toBe('leave this as it is');
        });

        it('Set the map drawing mode to edit and not to reset dataSelection', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = 'leave this as it is';
            output = mapReducers[ACTIONS.MAP_START_DRAWING.id](inputState, DRAW_TOOL_CONFIG.DRAWING_MODE.EDIT);
            expect(output.map.drawingMode).toBe(DRAW_TOOL_CONFIG.DRAWING_MODE.EDIT);
            expect(output.dataSelection).toBe('leave this as it is');
        });

        it('Should reset dataSelection state only when markers are on the map and draw mode is not edit', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = { geometryFilter: { markers: [1, 2] } };

            output = mapReducers[ACTIONS.MAP_START_DRAWING.id](inputState, DRAW_TOOL_CONFIG.DRAWING_MODE.DRAW);
            expect(output.dataSelection.geometryFilter).toEqual({markers: []});
            expect(output.dataSelection.page).toBe(1);
            expect(output.dataSelection.isFullscreen).toBe(false);
            expect(output.dataSelection.isLoading).toBe(true);
            expect(output.dataSelection.view).toBe('LIST');
            expect(output.dataSelection.markers).toEqual([]);
            expect(output.dataSelection.reset).toBe(true);
        });

        it('Should not reset dataSelection state with markers on the map and draw mode is edit', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = { geometryFilter: { markers: [1] } };

            output = mapReducers[ACTIONS.MAP_START_DRAWING.id](inputState, DRAW_TOOL_CONFIG.DRAWING_MODE.EDIT);
            expect(output.dataSelection.geometryFilter).toEqual({ markers: [1] });
            expect(output.dataSelection.page).toBeUndefined();
            expect(output.dataSelection.reset).toBeFalsy();
        });

        it('Should not reset dataSelection state with no markers on the map and draw mode is not edit', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = { geometryFilter: { markers: [] } };

            output = mapReducers[ACTIONS.MAP_START_DRAWING.id](inputState, DRAW_TOOL_CONFIG.DRAWING_MODE.DRAW);
            expect(output.dataSelection.page).toBeUndefined();
            expect(output.dataSelection.reset).toBeFalsy();
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_START_DRAWING.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_CLEAR_DRAWING', function () {
        it('Clears the map geometry', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.map.geometry = 'aap';
            output = mapReducers[ACTIONS.MAP_CLEAR_DRAWING.id](inputState);
            expect(output.map.geometry).toEqual([]);
        });

        it('when map is not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;

            const output = mapReducers[ACTIONS.MAP_CLEAR_DRAWING.id](inputState);
            expect(output.map).toBeNull();
        });
    });

    describe('MAP_END_DRAWING', function () {
        it('Set the map drawing mode to false', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: []
            });
            expect(output.map.drawingMode).toBe(DRAW_TOOL_CONFIG.DRAWING_MODE.NONE);
        });

        it('resets the page with more than 2 markers', () => {
            const inputState = angular.copy(DEFAULT_STATE);

            const output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['noot', 'mies', 'teun']
            });
            expect(output.page.name).toBeNull();
            expect(output.dataSelection.reset).toBeFalsy();
        });

        it('Leaves the dataSelection state untouched on an argument polygon with <= 1 markers', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = 'aap';
            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['noot']
            });
            expect(output.dataSelection).toBe('aap');

            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: []
            });
            expect(output.dataSelection).toBe('aap');
        });

        it('Sets the map geometry on a polygon with 2 markers', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['noot', 'mies']
            });
            expect(output.map.geometry).toEqual(['noot', 'mies']);
            expect(output.page.name).toBe('home');
        });

        it('Initializes the dataSelection state when a payload is specified', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = null;
            const geometryFilter = {
                markers: ['noot', 'mies', 'teun'],
                description: 'description'
            };
            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, geometryFilter);
            expect(output.dataSelection).not.toBe(null);
            expect(output.dataSelection.geometryFilter).toEqual(geometryFilter);
        });

        it('Does not initialize the dataSelection state when payload is missing', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = 'aap';
            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState);
            expect(output.dataSelection).toBe('aap');
        });

        it('Leaves dataset and filters of an existing dataSelection state untouched', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            inputState.dataSelection = {
                dataset: 'aap'
            };
            inputState.filters = {
                foo: 'noot'
            };

            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['noot', 'mies', 'teun']
            });

            expect(output.dataSelection.dataset).toEqual('aap');
            expect(output.filters.foo).toEqual('noot');
        });

        it('Sets page, fullscreen, loading, view and markers of the dataSelection state', function () {
            var inputState = angular.copy(DEFAULT_STATE),
                output;

            output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['noot', 'mies', 'teun']
            });
            expect(output.dataSelection.geometryFilter).toEqual({
                markers: ['noot', 'mies', 'teun']
            });
            expect(output.dataSelection.page).toBe(1);
            expect(output.dataSelection.isFullscreen).toBe(false);
            expect(output.dataSelection.isLoading).toBe(true);
            expect(output.dataSelection.view).toBe('LIST');
            expect(output.dataSelection.markers).toEqual([]);
        });

        it('Closes the full screen map and layer selection on polygon and sets map to be loading', () => {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.isLoading = false;
            inputState.ui.isMapFullscreen = true;
            inputState.ui.isMapPanelVisible = true;

            const output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['p1', 'p2', 'p3']
            });

            expect(output.ui.isMapFullscreen).toBe(false);
            expect(output.map.isLoading).toBe(true);
            expect(output.ui.isMapPanelVisible).toBe(false);
        });

        it('Does not close full screen map and layer selection on line and does not set map to be loading', () => {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map.isLoading = false;
            inputState.ui.isMapFullscreen = true;
            inputState.ui.isMapPanelVisible = true;

            const output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState, {
                markers: ['p1', 'p2']
            });

            expect(output.ui.isMapFullscreen).toBe(true);
            expect(output.map.isLoading).toBe(false);
            expect(output.ui.isMapPanelVisible).toBe(true);
        });

        it('when map and map panel and page are not an object', function () {
            const inputState = angular.copy(DEFAULT_STATE);
            inputState.map = null;
            inputState.ui = null;
            inputState.page = null;

            const output = mapReducers[ACTIONS.MAP_END_DRAWING.id](inputState);
            expect(output.map).toBeNull();
            expect(output.ui).toBeNull();
            expect(output.page).toBeNull();
        });
    });
});
