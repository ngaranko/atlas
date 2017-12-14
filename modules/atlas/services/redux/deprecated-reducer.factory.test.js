describe('The deprecated reducer factory', function () {
    var reducer,
        $window,
        $timeout,
        urlReducers,
        homeReducers,
        mapReducers,
        pageReducers,
        searchReducers,
        straatbeeldReducers,
        dataSelectionReducers,
        printReducers,
        embedReducers,
        filtersReducers,
        inputState,
        freeze,
        environment;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                $window: {
                    reducers: {
                        detailReducer: angular.noop,
                        MapLayersReducer: angular.noop,
                        MapPanelReducer: angular.noop,
                        MapOverlaysReducer: angular.noop,
                        MapBaseLayersReducer: angular.noop,
                        ErrorMessageReducer: angular.identity
                    }
                },
                freeze: jasmine.createSpyObj('freeze', ['deepFreeze']),
                environment: jasmine.createSpyObj('environment', ['isDevelopment']),
                urlReducers: {
                    ACTION_A: function () {}
                },
                homeReducers: {
                    ACTION_C: function () {}
                },
                mapReducers: {
                    ACTION_E: function () {}
                },
                pageReducers: {
                    ACTION_F: function () {}
                },
                searchReducers: {
                    ACTION_G: function () {}
                },
                straatbeeldReducers: {
                    ACTION_H: function () {}
                },
                dataSelectionReducers: {
                    ACTION_I: function () {}
                },
                printReducers: {
                    ACTION_J: function () {}
                },
                embedReducers: {
                    ACTION_K: function () {}
                },
                filtersReducers: {
                    ACTION_L: function () {}
                }
            }
        );

        // eslint-disable-next-line max-params
        angular.mock.inject(function (
            _$window_,
            _$timeout_,
            _urlReducers_,
            _homeReducers_,
            _mapReducers_,
            _pageReducers_,
            _searchReducers_,
            _straatbeeldReducers_,
            _dataSelectionReducers_,
            _printReducers_,
            _embedReducers_,
            _filtersReducers_,
            _freeze_,
            _environment_
        ) {
            $window = _$window_;
            $timeout = _$timeout_;
            urlReducers = _urlReducers_;
            homeReducers = _homeReducers_;
            mapReducers = _mapReducers_;
            pageReducers = _pageReducers_;
            searchReducers = _searchReducers_;
            straatbeeldReducers = _straatbeeldReducers_;
            dataSelectionReducers = _dataSelectionReducers_;
            printReducers = _printReducers_;
            embedReducers = _embedReducers_;
            filtersReducers = _filtersReducers_;
            freeze = _freeze_;
            environment = _environment_;
        });

        const DEFAULT_STATE = {
            map: {
                baseLayer: 'topografie',
                overlays: [],
                viewCenter: [52.3719, 4.9012],
                zoom: 9,
                isFullscreen: false,
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
                isMapPanelVisible: false
            }
        };

        angular.mock.inject(function (_deprecatedReducer_) {
            reducer = _deprecatedReducer_;
            inputState = DEFAULT_STATE;
        });

        environment.isDevelopment.and.returnValue(false);
    });

    it('groups all separate reducers and calls the appropriate one depening on the action type', function () {
        spyOn(urlReducers, 'ACTION_A').and.callThrough();
        spyOn(homeReducers, 'ACTION_C').and.callThrough();
        spyOn(mapReducers, 'ACTION_E').and.callThrough();
        spyOn(pageReducers, 'ACTION_F').and.callThrough();
        spyOn(searchReducers, 'ACTION_G').and.callThrough();
        spyOn(straatbeeldReducers, 'ACTION_H').and.callThrough();
        spyOn(dataSelectionReducers, 'ACTION_I').and.callThrough();
        spyOn(printReducers, 'ACTION_J').and.callThrough();
        spyOn(embedReducers, 'ACTION_K').and.callThrough();
        spyOn(filtersReducers, 'ACTION_L').and.callThrough();

        reducer(inputState, {type: {id: 'ACTION_A'}});
        reducer(inputState, {type: {id: 'ACTION_B'}});
        reducer(inputState, {type: {id: 'ACTION_C'}});
        reducer(inputState, {type: {id: 'ACTION_E'}});
        reducer(inputState, {type: {id: 'ACTION_F'}});
        reducer(inputState, {type: {id: 'ACTION_G'}});
        reducer(inputState, {type: {id: 'ACTION_H'}});
        reducer(inputState, {type: {id: 'ACTION_I'}});
        reducer(inputState, {type: {id: 'ACTION_J'}});
        reducer(inputState, {type: {id: 'ACTION_K'}});
        reducer(inputState, {type: {id: 'ACTION_L'}});

        expect(urlReducers.ACTION_A).toHaveBeenCalled();
        expect(homeReducers.ACTION_C).toHaveBeenCalled();
        expect(mapReducers.ACTION_E).toHaveBeenCalled();
        expect(pageReducers.ACTION_F).toHaveBeenCalled();
        expect(searchReducers.ACTION_G).toHaveBeenCalled();
        expect(straatbeeldReducers.ACTION_H).toHaveBeenCalled();
        expect(dataSelectionReducers.ACTION_I).toHaveBeenCalled();
        expect(printReducers.ACTION_J).toHaveBeenCalled();
        expect(embedReducers.ACTION_K).toHaveBeenCalled();
        expect(filtersReducers.ACTION_L).toHaveBeenCalled();
    });

    it('returns the oldState if the specified action type has no separate reducer', function () {
        // Note redux has some built-in action types that we can safely ignore.
        var output = reducer(inputState, {type: {id: 'ACTION_NO_REDUCER'}});

        expect(output).toBe(inputState);
    });

    it('always calls the ErrorMessageReducer', function () {
        spyOn(urlReducers, 'ACTION_A').and.callThrough();
        spyOn($window.reducers, 'ErrorMessageReducer').and.callThrough();

        reducer(inputState, {type: {id: 'ACTION_A'}});
        reducer(inputState, {type: {id: 'ACTION_B'}});

        expect(urlReducers.ACTION_A).toHaveBeenCalled();
        expect($window.reducers.ErrorMessageReducer).toHaveBeenCalled();
    });

    it('deep freezes the state in development', () => {
        const state = { foo: 'bar' };
        spyOn(urlReducers, 'ACTION_A').and.returnValue(state);
        environment.isDevelopment.and.returnValue(true);

        reducer(inputState, {type: {id: 'ACTION_A'}});

        expect(freeze.deepFreeze).toHaveBeenCalledWith(state);
    });

    describe('should map vanilla reducers for cross-compatibility', function () {
        let payload;

        beforeEach(() => {
            payload = { foo: 'bar' };
            environment.isDevelopment.and.returnValue(true);
        });

        it('detail reducers', function () {
            spyOn($window.reducers, 'detailReducer');

            reducer(inputState, {
                payload,
                type: {
                    id: 'FETCH_DETAIL'
                }
            });

            expect($window.reducers.detailReducer.calls.mostRecent().args[1])
                .toEqual(jasmine.objectContaining({ payload, type: 'FETCH_DETAIL' }));
        });

        it('map layers reducers', function () {
            spyOn($window.reducers, 'MapLayersReducer');

            reducer(inputState, {
                type: 'FETCH_MAP_LAYERS_REQUEST'
            });

            expect($window.reducers.MapLayersReducer.calls.mostRecent().args[1])
                .toEqual(jasmine.objectContaining({ type: 'FETCH_MAP_LAYERS_REQUEST' }));
        });

        it('map overlays reducers', function () {
            spyOn($window.reducers, 'MapOverlaysReducer');

            reducer(inputState, {
                type: 'TOGGLE_MAP_OVERLAY'
            });

            $timeout.flush();

            expect($window.reducers.MapOverlaysReducer.calls.mostRecent().args[1])
                .toEqual(jasmine.objectContaining({ type: 'TOGGLE_MAP_OVERLAY' }));
        });

        it('map base layers reducers', function () {
            spyOn($window.reducers, 'MapBaseLayersReducer');

            reducer(inputState, {
                type: 'FETCH_MAP_BASE_LAYERS_REQUEST'
            });

            $timeout.flush();

            expect($window.reducers.MapBaseLayersReducer.calls.mostRecent().args[1])
                .toEqual(jasmine.objectContaining({ type: 'FETCH_MAP_BASE_LAYERS_REQUEST' }));
        });
    });
});
