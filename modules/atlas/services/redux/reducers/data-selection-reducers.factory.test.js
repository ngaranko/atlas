describe('The dataSelectionReducers factory', function () {
    let dataSelectionReducers,
        ACTIONS;

    const DEFAULT_STATE = {
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

        angular.mock.inject(function (_dataSelectionReducers_, _ACTIONS_) {
            dataSelectionReducers = _dataSelectionReducers_;
            ACTIONS = _ACTIONS_;
        });
    });

    describe('FETCH_DATA_SELECTION', function () {
        let payload;

        beforeEach(function () {
            payload = {
                dataset: 'bag',
                page: 1
            };
        });

        it('makes the map small (!isFullscreen), relevant when navigating via dp-dropdown-menu', () => {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.ui.isMapFullscreen = true;

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.ui.isMapFullscreen).toBe(false);
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

        it('can display in list view from state', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.dataSelection = {
                view: 'LIST'
            };

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                view: 'LIST'
            }));
            expect(output.map.isLoading).toEqual(true);
        });

        it('sets the dataSelection dataset, filters and page', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.filters = {
                buurtcombinatie: 'Geuzenbuurt',
                buurt: 'Trompbuurt'
            };
            payload.filters = {
                filter: 'filterValue'
            };

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                dataset: 'bag',
                page: 1
            }));

            expect(output.filters).toEqual({
                filter: 'filterValue'
            });
        });

        it('sets the dataSelection dataset and page', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.filters = {
                buurtcombinatie: 'Geuzenbuurt',
                buurt: 'Trompbuurt'
            };

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                dataset: 'bag',
                page: 1
            }));

            expect(output.filters).toEqual({
                buurtcombinatie: 'Geuzenbuurt',
                buurt: 'Trompbuurt'
            });
        });

        it('sets the dataSelection query, page, view, dataset and empties filters', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.filters = {
                buurtcombinatie: 'Geuzenbuurt',
                buurt: 'Trompbuurt'
            };

            payload.emptyFilters = true;

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toEqual(jasmine.objectContaining({
                page: 1,
                view: 'TABLE',
                dataset: 'bag'
            }));
            expect(output.filters).toEqual({});
        });

        it('can reset geometry filter', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            payload.resetGeometryFilter = true;

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.geometryFilter).toEqual({
                markers: [],
                description: ''
            });
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

        it('when payload is empty and map and ui and page are not an object', function () {
            const mockedState = angular.copy(DEFAULT_STATE);
            mockedState.map = null;
            mockedState.ui = null;
            mockedState.page = null;

            const output = dataSelectionReducers[ACTIONS.FETCH_DATA_SELECTION.id](mockedState, '');
            expect(output.map).toBeNull();
            expect(output.ui).toBeNull();
            expect(output.page).toBeNull();
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
                    page: 1,
                    isLoading: true
                },
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
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

        it('does nothing if the user has navigated away from dataSelection before the API is finished', () => {
            mockedState.dataSelection = null;
            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toBeNull();
        });

        it('when map is not an object', function () {
            mockedState.map = null;

            output = dataSelectionReducers[ACTIONS.SHOW_DATA_SELECTION.id](mockedState, payload);
            expect(output.map).toBeNull();
        });
    });

    describe('RESET_DATA_SELECTION', function () {
        let mockedState,
            payload,
            output;

        beforeEach(function () {
            mockedState = {
                dataSelection: {
                    dataset: 'bag',
                    page: 1,
                    isLoading: true
                },
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
                },
                map: {
                    isLoading: true
                }
            };

            payload = ['MOCKED', 'MARKER', 'ARRAY'];
        });

        it('adds markers to the state', function () {
            output = dataSelectionReducers[ACTIONS.RESET_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.markers).toEqual(['MOCKED', 'MARKER', 'ARRAY']);
        });

        it('sets isLoading to false', function () {
            output = dataSelectionReducers[ACTIONS.RESET_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.isLoading).toEqual(false);
        });

        it('sets map isLoading to false', function () {
            output = dataSelectionReducers[ACTIONS.RESET_DATA_SELECTION.id](mockedState, payload);

            expect(output.map.isLoading).toEqual(false);
        });

        it('does nothing if the user has navigated away from dataSelection before the API is finished', () => {
            mockedState.dataSelection = null;
            output = dataSelectionReducers[ACTIONS.RESET_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection).toBeNull();
        });

        it('sets the reset flag to false', function () {
            mockedState.dataSelection.reset = true;
            output = dataSelectionReducers[ACTIONS.RESET_DATA_SELECTION.id](mockedState, payload);

            expect(output.dataSelection.reset).toBe(false);
        });

        it('when map is not an object', function () {
            mockedState.map = null;

            output = dataSelectionReducers[ACTIONS.RESET_DATA_SELECTION.id](mockedState, payload);
            expect(output.map).toBeNull();
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
                    page: 1,
                    isLoading: true
                },
                filters: {
                    buurtcombinatie: 'Geuzenbuurt',
                    buurt: 'Trompbuurt'
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

        it('when dataSelection and map are not an object', function () {
            mockedState.dataSelection = null;
            mockedState.map = null;

            output = dataSelectionReducers[ACTIONS.SET_DATA_SELECTION_VIEW.id](mockedState, 'LIST');
            expect(output.dataSelection).toBeNull();
            expect(output.map).toBeNull();
        });
    });

    describe('NAVIGATE_DATA_SELECTION', function () {
        it('updates the page', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            mockedState.dataSelection = {
                dataset: 'bag',
                page: 1
            };

            const output = dataSelectionReducers[ACTIONS.NAVIGATE_DATA_SELECTION.id](mockedState, 4);

            expect(output.dataSelection).toEqual({
                dataset: 'bag',
                page: 4
            });
        });

        it('when dataSelection is not an object', function () {
            const mockedState = angular.copy(DEFAULT_STATE);

            mockedState.dataSelection = null;

            const output = dataSelectionReducers[ACTIONS.NAVIGATE_DATA_SELECTION.id](mockedState, 4);
            expect(output.dataSelection).toBeNull();
        });
    });
});
