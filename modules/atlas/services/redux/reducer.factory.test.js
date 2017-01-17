describe('The reducer factory', function () {
    var reducer,
        urlReducers,
        homeReducers,
        detailReducers,
        layerSelectionReducers,
        mapReducers,
        pageReducers,
        searchReducers,
        straatbeeldReducers,
        dataSelectionReducers,
        printReducers,
        inputState;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                urlReducers: {
                    ACTION_A: function () {}
                },
                detailReducers: {
                    ACTION_B: function () {}
                },
                homeReducers: {
                    ACTION_C: function () {}
                },
                layerSelectionReducers: {
                    ACTION_D: function () {}
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
                }
            }
        );

        angular.mock.inject(function (
            _urlReducers_,
            _detailReducers_,
            _homeReducers_,
            _layerSelectionReducers_,
            _mapReducers_,
            _pageReducers_,
            _searchReducers_,
            _straatbeeldReducers_,
            _dataSelectionReducers_,
            _printReducers_) {
            urlReducers = _urlReducers_;
            detailReducers = _detailReducers_;
            homeReducers = _homeReducers_;
            layerSelectionReducers = _layerSelectionReducers_;
            mapReducers = _mapReducers_;
            pageReducers = _pageReducers_;
            searchReducers = _searchReducers_;
            straatbeeldReducers = _straatbeeldReducers_;
            dataSelectionReducers = _dataSelectionReducers_;
            printReducers = _printReducers_;
        });

        let DEFAULT_STATE = {
            map: {
                baseLayer: 'topografie',
                overlays: [],
                viewCenter: [52.3719, 4.9012],
                zoom: 9,
                showActiveOverlays: false,
                isFullscreen: false,
                isLoading: false
            },
            layerSelection: false,
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

        angular.mock.inject(function (_reducer_) {
            reducer = _reducer_;
            inputState = DEFAULT_STATE;
        });
    });

    it('groups all separate reducers and calls the appropriate one depening on the action type', function () {
        spyOn(urlReducers, 'ACTION_A').and.callThrough();
        spyOn(detailReducers, 'ACTION_B').and.callThrough();
        spyOn(homeReducers, 'ACTION_C').and.callThrough();
        spyOn(layerSelectionReducers, 'ACTION_D').and.callThrough();
        spyOn(mapReducers, 'ACTION_E').and.callThrough();
        spyOn(pageReducers, 'ACTION_F').and.callThrough();
        spyOn(searchReducers, 'ACTION_G').and.callThrough();
        spyOn(straatbeeldReducers, 'ACTION_H').and.callThrough();
        spyOn(dataSelectionReducers, 'ACTION_I').and.callThrough();
        spyOn(printReducers, 'ACTION_J').and.callThrough();

        reducer(inputState, {type: {id: 'ACTION_A'}});
        reducer(inputState, {type: {id: 'ACTION_B'}});
        reducer(inputState, {type: {id: 'ACTION_C'}});
        reducer(inputState, {type: {id: 'ACTION_D'}});
        reducer(inputState, {type: {id: 'ACTION_E'}});
        reducer(inputState, {type: {id: 'ACTION_F'}});
        reducer(inputState, {type: {id: 'ACTION_G'}});
        reducer(inputState, {type: {id: 'ACTION_H'}});
        reducer(inputState, {type: {id: 'ACTION_I'}});
        reducer(inputState, {type: {id: 'ACTION_J'}});

        expect(urlReducers.ACTION_A).toHaveBeenCalled();
        expect(detailReducers.ACTION_B).toHaveBeenCalled();
        expect(homeReducers.ACTION_C).toHaveBeenCalled();
        expect(layerSelectionReducers.ACTION_D).toHaveBeenCalled();
        expect(mapReducers.ACTION_E).toHaveBeenCalled();
        expect(pageReducers.ACTION_F).toHaveBeenCalled();
        expect(searchReducers.ACTION_G).toHaveBeenCalled();
        expect(straatbeeldReducers.ACTION_H).toHaveBeenCalled();
        expect(dataSelectionReducers.ACTION_I).toHaveBeenCalled();
        expect(printReducers.ACTION_J).toHaveBeenCalled();
    });

    it('returns the oldState if the specified action type has no separate reducer', function () {
        // Note redux has some built-in action types that we can safely ignore.
        var output = reducer(inputState, {type: 'ACTION_K'});

        expect(output).toBe(inputState);
    });
});
