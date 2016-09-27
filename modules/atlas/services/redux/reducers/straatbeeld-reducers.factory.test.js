describe('Straatbeeld reducers factory', function () {

    var straatbeeldReducers,
        inputState,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module('atlas', {
            straatbeeldConfig: {
                DEFAULT_FOV: 80
            }
        });

        angular.mock.inject(function (_straatbeeldReducers_, _DEFAULT_STATE_, _ACTIONS_) {
            straatbeeldReducers = _straatbeeldReducers_;
            inputState = angular.copy(_DEFAULT_STATE_);
            ACTIONS = _ACTIONS_;
        });

    });


    describe('FETCH_STRAATBEELD', function () {
        var payload = {
            'panoId': 'ABC',
            'heading': 123,
            'isInitial': true
        };


        it('Set INITIAL panoId, heading, isInitial', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining(payload));
        });

        it('Sets loading indication for map and straatbeeld', function () {
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(true);
            expect(newState.map.isLoading).toBe(true);
        });

        fit('resets previous straatbeeld variables', function () {

            inputState.straatbeeld = {
                'fov': 1,
                'pitch': 2,
                'date': 'today',
                'hotspots': ['a', 'b'],
                'location': ['lat', 'lon'],
                'image': 'http://example.com/example.png'
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
 
            expect(newState.straatbeeld.fov).toBeNull();
            expect(newState.straatbeeld.pitch).toBeNull();
            expect(newState.straatbeeld.date).toBeNull();
            expect(newState.straatbeeld.hotspots).toEqual([]);
            expect(newState.straatbeeld.location).toBeNull();
            expect(newState.straatbeeld.image).toBeNull();
        });

        it('resets detail information', function () {
            inputState.detail = {
                endpoint: 'bag/verblijfsobject/123/',
                geometry: null,
                isLoading: false
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.detail).toBeNull();
        });

        it('resets search results', function () {
            inputState.search = {
                query: 'linnaeus',
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.search).toBeNull();
        });

    });

    describe('SHOW_STRAATBEELD', function () {
        var payload = {
            date: new Date('2016-05-19T13:04:15.341110Z'),
            hotspots: [{
                panoId: 'ABC',
                heading: 179,
                distance: 3
            }],
            location: [52, 4],
            image: 'http://example.com/example/bla.png'
        };

        beforeEach(function () {
            inputState.straatbeeld = {
                isLoading: true,
                panoId: 'ABC',
                heading: 123,
                isInitial: true
            };

            inputState.detail = null;
        });


        it('Adds the payload to the state', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);

            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                date: new Date('2016-05-19T13:04:15.341110Z'),
                hotspots: [{
                    panoId: 'ABC',
                    heading: 179,
                    distance: 3
                }],
                location: [52, 4],
                image: 'http://example.com/example/bla.png'
            }));
        });

        it('set Pitch to 0', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld.pitch).toBe(0);
        });

        it('do not overwrite isLoading, panoId, heading, isInitial', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                panoId: 'ABC',
                heading: 123,
                isInitial: true
            }));
        });

        it('Sets loading to false', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(false);
            expect(newState.map.isLoading).toBe(false);
        });

        it('sets FOV to DEFAULT_FOV', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld.fov).toBe(80);
        });



        it('does nothing when straatbeeld is null', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);

            expect(newState.straatbeeld).toBeNull();
        });
    });
});