describe('The dataSelectionReducers factory', function () {
    let dataSelectionReducers,
        ACTIONS,
        DRAW_TOOL_CONFIG;

    const DEFAULT_STATE = {
        map: {
            baseLayer: 'topografie',
            overlays: [],
            viewCenter: [52.3719, 4.9012],
            zoom: 9,
            showActiveOverlays: false,
            isFullscreen: false,
            isLoading: false
        },
        layerSelection: {
            isEnabled: false
        },
        search: null,
        page: {
            name: 'home'
        },
        detail: null,
        straatbeeld: null,
        dataSelection: null,
        atlas: {
            isPrintMode: false
        }
    };

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_dataSelectionReducers_, _ACTIONS_, _DRAW_TOOL_CONFIG_) {
            dataSelectionReducers = _dataSelectionReducers_;
            ACTIONS = _ACTIONS_;
            DRAW_TOOL_CONFIG = _DRAW_TOOL_CONFIG_;
        });
    });

    describe('FETCH_DATA_SELECTION', function () {
        let payload;

        beforeEach(function () {
            payload = {
                dataset: 'bag',
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
                },
                page: 1
            };
        });

        it('makes the map small (!isFullscreen), relevant when navigating via dp-dropdown-menu', () => {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.map.isFullscreen = true;

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.map.isFullscreen).toBe(false);
        });

        it('has a default table view and set map not to be loading', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                view: 'TABLE'
            }));
            expect(output.map.isLoading).toEqual(false);
        });

        it('can display in list view and set map to be loading', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            payload.view = 'LIST';

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                view: 'LIST'
            }));
            expect(output.map.isLoading).toEqual(true);
        });

        it('sets the dataSelection dataset, filters and page', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                dataset: 'bag',
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
                },
                page: 1
            }));
        });

        it('sets the dataSelection query and empties filters', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            payload = 'zoek';

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                query: 'zoek'
            }));
            expect(output.dataSelection.filters).toEqual({});
        });

        it('makes the Array of markers empty', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                markers: []
            }));
        });

        it('sets isLoading to true', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.isLoading).toBe(true);
        });

        it('disables search, page, detail and straatbeeld', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.search = {some: 'object'};
            mockedState.page.name = 'somePage';
            mockedState.detail = {some: 'object'};
            mockedState.straatbeeld = {some: 'object'};

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.search).toBeNull();
            expect(output.page.name).toBeNull();
            expect(output.detail).toBeNull();
            expect(output.straatbeeld).toBeNull();
        });

        it('preserves the isPrintMode variable', function () {
            let output;
            const mockedState = angular.copy(DEFAULT_STATE);

            // With print mode enabled
            mockedState.atlas.isPrintMode = true;
            output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);
            expect(output.atlas.isPrintMode).toBe(true);

            // With print mode disabled
            mockedState.atlas.isPrintMode = false;
            output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);
            expect(output.atlas.isPrintMode).toBe(false);
        });
    });

    describe('SHOW_DATA_SELECTION', function () {
        let mockedState,
            payload,
            output;

        beforeEach(function () {
            mockedState = {
                dataSelection: {
                    dataset: 'bag',
                    filters: {
                        buurtcombinatie: 'Geuzenbuurt',
                        buurt: 'Trompbuurt'
                    },
                    page: 1,
                    isLoading: true
                },
                map: {
                    isLoading: true
                }
            };

            payload = ['MOCKED', 'MARKER', 'ARRAY'];
        });

        it('adds markers to the state', function () {
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.markers).toEqual(['MOCKED', 'MARKER', 'ARRAY']);
        });

        it('sets isLoading to false', function () {
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.isLoading).toEqual(false);
        });

        it('sets map isLoading to false', function () {
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.map.isLoading).toEqual(false);
        });

        it('does nothing if the user has navigated away from dataSelection before the API is finished', function () {
            mockedState.dataSelection = null;
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toBeNull();
        });

        it('should reset drawing mode when full screen', function () {
            mockedState.dataSelection.view = 'TABLE';
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.map.drawingMode).toEqual(DRAW_TOOL_CONFIG.DRAWING_MODE.NONE);
        });

        it('should reset drawing mode when not full screen', function () {
            mockedState.dataSelection.view = 'LIST';
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.map.drawingMode).toBeUndefined();
        });
    });

    describe('SET_DATA_SELECTION_VIEW', function () {
        let mockedState,
            payload,
            output;

        beforeEach(function () {
            mockedState = {
                dataSelection: {
                    dataset: 'bag',
                    filters: {
                        buurtcombinatie: 'Geuzenbuurt',
                        buurt: 'Trompbuurt'
                    },
                    page: 1,
                    isLoading: true
                },
                map: {}
            };
        });

        it('can set the view to list view and set map to be loading', function () {
            payload = 'LIST';

            output = dataSelectionReducers[ACTIONS.SET_DATA_SELECTION_VIEW.id](mockedState, payload);

            expect(output.dataSelection.view).toBe('LIST');
            expect(output.map.isLoading).toBe(true);
        });

        it('can set the view to table view and set map not to be loading', function () {
            payload = 'TABLE';

            output = dataSelectionReducers[ACTIONS.SET_DATA_SELECTION_VIEW.id](mockedState, payload);

            expect(output.dataSelection.view).toBe('TABLE');
            expect(output.map.isLoading).toBe(false);
        });

        it('refuses to set the view to an unknown view', function () {
            payload = 'aap';

            output = dataSelectionReducers[ACTIONS.SET_DATA_SELECTION_VIEW.id](mockedState, payload);

            expect(output.dataSelection.view).toBeUndefined();
        });

        it('sets isLoading to true', function () {
            payload = 'LIST';
            mockedState.dataSelection.isLoading = false;

            output = dataSelectionReducers[ACTIONS.SET_DATA_SELECTION_VIEW.id](mockedState, payload);

            expect(output.dataSelection.isLoading).toBe(true);
        });
    });

    describe('NAVIGATE_DATA_SELECTION', function () {
        it('updates the page', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            mockedState.dataSelection = {
                dataset: 'bag',
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
                },
                page: 1
            };

            const output = dataSelectionReducers[ACTIONS.NAVIGATE_DATA_SELECTION.id](mockedState, 4);

            expect(output.dataSelection).toEqual({
                dataset: 'bag',
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
                },
                page: 4
            });
        });
    });
});
