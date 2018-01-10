describe('The homeReducers factory', function () {
    var homeReducers,
        DEFAULT_STATE,
        mockedStates = [],
        mockedSearchState,
        mockedPageState,
        mockedDetailState,
        mockedStraatbeeldState;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_homeReducers_, _stateUrlConverter_) {
            homeReducers = _homeReducers_;
            DEFAULT_STATE = _stateUrlConverter_.getDefaultState();
        });

        mockedSearchState = angular.copy(DEFAULT_STATE);
        mockedSearchState.search = {
            query: 'I AM A QUERY',
            location: null,
            category: null,
            page: {
                name: null
            }
        };

        mockedPageState = angular.copy(DEFAULT_STATE);
        mockedPageState.page = {
            name: 'over-atlas'
        };

        mockedDetailState = angular.copy(DEFAULT_STATE);
        mockedDetailState.detail = {
            endpoint: 'http://www.example.com/whatever/123/',
            geometry: null,
            isLoading: false,
            page: {
                name: null
            }
        };

        mockedStraatbeeldState = angular.copy(DEFAULT_STATE);
        mockedStraatbeeldState.straatbeeld = {
            id: 123,
            searchLocation: null,
            date: new Date(),
            car: {
                location: [52.789, 4.123],
                heading: 1,
                pitch: 2
            },
            camera: {
                heading: 180,
                pitch: 0
            },
            hotspots: [],
            isLoading: false,
            page: {
                name: null
            }
        };

        mockedStates.push(
            mockedSearchState,
            mockedPageState,
            mockedDetailState,
            mockedStraatbeeldState
        );
    });

    describe('SHOW_HOME', function () {
        it('resets the state to the default', function () {
            mockedStates.forEach(function (inputState) {
                expect(homeReducers.SHOW_HOME(inputState)).toEqual(DEFAULT_STATE);
            });
        });

        it('keeps the isPrintMode setting', function () {
            mockedStates.forEach(function (inputState) {
                inputState.ui.isPrintMode = true;
                expect(homeReducers.SHOW_HOME(inputState).ui.isPrintMode).toBe(true);

                inputState.ui.isPrintMode = false;
                expect(homeReducers.SHOW_HOME(inputState).ui.isPrintMode).toBe(false);
            });
        });

        it('keeps the isEmbedPreview setting', function () {
            mockedStates.forEach(function (inputState) {
                inputState.ui.isEmbedPreview = true;
                expect(homeReducers.SHOW_HOME(inputState).ui.isEmbedPreview).toBe(true);

                inputState.ui.isEmbedPreview = false;
                expect(homeReducers.SHOW_HOME(inputState).ui.isEmbedPreview).toBe(false);
            });
        });

        it('keeps the mapLayers setting', function () {
            mockedStates.forEach(function (inputState) {
                inputState.mapLayers = [1, 2, 3];
                expect(homeReducers.SHOW_HOME(inputState).mapLayers).toEqual([1, 2, 3]);
            });
        });

        it('keeps the mapBaseLayers setting', function () {
            mockedStates.forEach(function (inputState) {
                inputState.mapBaseLayers = [1, 2, 3];
                expect(homeReducers.SHOW_HOME(inputState).mapBaseLayers).toEqual([1, 2, 3]);
            });
        });
    });
});
