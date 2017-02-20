describe('The state url conversion definition', function () {
    let STATE_URL_CONVERSION;

    beforeEach(function () {
        angular.mock.module('atlas', {});

        angular.mock.inject(function (_STATE_URL_CONVERSION_) {
            STATE_URL_CONVERSION = _STATE_URL_CONVERSION_;
        });
    });

    describe('The registered state initialisation methods', function () {
        it('initialize a state to the home page and it sets a default map, (only) on an empty payload', function () {
            let state;

            state = STATE_URL_CONVERSION.onCreate.DEFAULT({}, {}, {}, STATE_URL_CONVERSION.initialValues);
            expect(state).toEqual({
                atlas: {
                    isPrintMode: false
                },
                page: {
                    name: 'home'
                },
                layerSelection: {
                    isEnabled: false
                },
                map: {
                    viewCenter: [52.3731081, 4.8932945],
                    baseLayer: 'topografie',
                    zoom: 11,
                    overlays: [],
                    isFullscreen: false,
                    isLoading: false,
                    showActiveOverlays: false,
                    drawingMode: false
                }
            });

            state = STATE_URL_CONVERSION.onCreate.DEFAULT({}, {}, {aap: 'noot'}, {});
            expect(state).toEqual({atlas: undefined, page: undefined, layerSelection: undefined});
        });
    });

    describe('The registered post processing methods', function () {
        describe('The post processing for dataSelection', function () {
            it('copies markers and isLoading from old state and determines fullscreen mode', function () {
                let oldState,
                    newState;

                oldState = {
                    markers: 'aap',
                    isLoading: 'noot',
                    something: 'else'
                };
                newState = {
                    view: 'LIST'
                };

                STATE_URL_CONVERSION.post.dataSelection(oldState, newState);
                expect(newState).toEqual({
                    markers: 'aap',
                    isLoading: 'noot',
                    view: 'LIST',
                    isFullscreen: false
                });

                oldState = null;
                newState = {
                    view: 'TABLE'
                };

                STATE_URL_CONVERSION.post.dataSelection(oldState, newState);
                expect(newState).toEqual({
                    view: 'TABLE',
                    isFullscreen: true
                });
            });
        });

        describe('The post processing for map', function () {
            it('copies the drawing mode and isLoading from the previous state', function () {
                // isLoading and drawingMode
                let oldState = {
                    isLoading: true,
                    drawingMode: true
                };
                let newState = {};

                STATE_URL_CONVERSION.post.map(oldState, newState);
                expect(newState).toEqual({
                    isLoading: true,
                    drawingMode: true
                });

                // only drawingMode
                oldState = {
                    drawingMode: false
                };
                newState = {};

                STATE_URL_CONVERSION.post.map(oldState, newState);
                expect(newState).toEqual({
                    isLoading: undefined,
                    drawingMode: false
                });

                // only isLoading
                oldState = {
                    isLoading: false
                };
                newState = {};

                STATE_URL_CONVERSION.post.map(oldState, newState);
                expect(newState).toEqual({
                    isLoading: false,
                    drawingMode: undefined
                });

                // no map state at all
                oldState = null;
                newState = {};

                STATE_URL_CONVERSION.post.map(oldState, newState);
                expect(newState).toEqual({});
            });
        });

        describe('The post processing for detail', function () {
            it('copies display, geometry, isLoading and isFullscreen from old state if equal endpoint', function () {
                let oldState,
                    newState;

                oldState = {
                    endpoint: 1,
                    display: 'aap',
                    geometry: 'noot',
                    isLoading: 'mies',
                    isFullscreen: 'wim',
                    something: 'else'
                };
                newState = {
                    endpoint: 1
                };

                STATE_URL_CONVERSION.post.detail(oldState, newState);
                expect(newState).toEqual({
                    endpoint: 1,
                    display: 'aap',
                    geometry: 'noot',
                    isLoading: 'mies',
                    isFullscreen: 'wim'
                });

                newState = {
                    endpoint: 2
                };

                STATE_URL_CONVERSION.post.detail(oldState, newState);
                expect(newState).toEqual({
                    endpoint: 2
                });
            });
        });

        describe('The post processing for search', () => {
            const OLD_STATE_WITH_QUERY = {
                query: 'dam',
                location: null,
                category: null,
                numberOfResults: 101,
                isLoading: false
            };
            const OLD_STATE_WITH_QUERY_AND_CATEGORY = {
                query: 'dam',
                location: null,
                category: 'adres',
                numberOfResults: 102,
                isLoading: false

            };
            const OLD_STATE_WITH_LOCATION = {
                query: null,
                location: [52.123, 4.789],
                category: null,
                numberOfResults: 103,
                isLoading: false
            };

            it('does nothing if there is no old search state', () => {
                let newState = angular.copy(OLD_STATE_WITH_QUERY);

                STATE_URL_CONVERSION.post.search(undefined, newState);

                expect(newState).toEqual(OLD_STATE_WITH_QUERY);
            });

            it('keeps isLoading and numberOfResults values if the query, location and category stay the same', () => {
                let newState;

                // With query
                newState = angular.copy(OLD_STATE_WITH_QUERY);
                STATE_URL_CONVERSION.post.search(OLD_STATE_WITH_QUERY, newState);
                expect(newState).toEqual(OLD_STATE_WITH_QUERY);

                // With query and category
                newState = angular.copy(OLD_STATE_WITH_QUERY_AND_CATEGORY);
                STATE_URL_CONVERSION.post.search(OLD_STATE_WITH_QUERY_AND_CATEGORY, newState);
                expect(newState).toEqual(OLD_STATE_WITH_QUERY_AND_CATEGORY);

                // With location
                newState = angular.copy(OLD_STATE_WITH_LOCATION);
                STATE_URL_CONVERSION.post.search(OLD_STATE_WITH_LOCATION, newState);
                expect(newState).toEqual(OLD_STATE_WITH_LOCATION);
            });

            it('resets the isLoading and numberOfResults values if the query, location or category changes', () => {
                let newState;

                // When the query changes
                newState = angular.copy(OLD_STATE_WITH_QUERY);
                newState.query = 'damrak'; // Instead of 'dam'
                STATE_URL_CONVERSION.post.search(OLD_STATE_WITH_QUERY, newState);
                expect(newState.numberOfResults).toBeNull();
                expect(newState.isLoading).toBe(true);

                // When the category changes
                newState = angular.copy(OLD_STATE_WITH_QUERY_AND_CATEGORY);
                newState.category = null;
                STATE_URL_CONVERSION.post.search(OLD_STATE_WITH_QUERY_AND_CATEGORY, newState);
                expect(newState.numberOfResults).toBeNull();
                expect(newState.isLoading).toBe(true);

                // When the location changes
                newState = angular.copy(OLD_STATE_WITH_LOCATION);
                newState.location = [52.999, 4.111];
                STATE_URL_CONVERSION.post.search(OLD_STATE_WITH_LOCATION, newState);
                expect(newState.numberOfResults).toBeNull();
                expect(newState.isLoading).toBe(true);
            });
        });

        describe('The post processing for straatbeeld', function () {
            it('copies image, hotspots, data, location, isInitial, isLoading from old state if equal id', function () {
                let oldState,
                    newState;

                oldState = {
                    id: 1,
                    image: 'aap',
                    hotspots: 'noot',
                    date: 'mies',
                    location: 'wim',
                    isLoading: 'teun',
                    something: 'else'
                };
                newState = {
                    id: 1
                };

                STATE_URL_CONVERSION.post.straatbeeld(oldState, newState);
                expect(newState).toEqual({
                    id: 1,
                    image: 'aap',
                    hotspots: 'noot',
                    date: 'mies',
                    location: 'wim',
                    isInitial: false,
                    isLoading: 'teun'
                });

                newState = {
                    id: 2
                };

                STATE_URL_CONVERSION.post.straatbeeld(oldState, newState);
                expect(newState).toEqual({
                    id: 2
                });
            });
        });
    });
});
