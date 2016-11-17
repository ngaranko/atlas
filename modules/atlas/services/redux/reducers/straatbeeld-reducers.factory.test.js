describe('Straatbeeld reducers factory', function () {
    var straatbeeldReducers,
        inputState,
        ACTIONS;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                straatbeeldConfig: {
                    DEFAULT_FOV: 79
                }
            }
        );

        angular.mock.inject(function (_straatbeeldReducers_, _DEFAULT_STATE_, _ACTIONS_) {
            straatbeeldReducers = _straatbeeldReducers_;
            inputState = angular.copy(_DEFAULT_STATE_);
            ACTIONS = _ACTIONS_;
        });
    });

    describe('FETCH_STRAATBEELD', function () {
        var payload;

        beforeEach(function () {
            payload = {
                'id': 'ABC',
                'heading': 123,
                'isInitial': true
            };
        });

        it('when heading is not in payload, use oldstate heading', function () {
            delete payload.heading;

            inputState.straatbeeld = {
                'fov': 1,
                'pitch': 2,
                'date': 'today',
                'heading': 179,
                'hotspots': ['a', 'b'],
                'location': ['lat', 'lon'],
                'image': 'http://example.com/example.png'
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.heading).toBe(179);
        });

        it('when heading is in payload, use the payload heading', function () {
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.heading).toBe(123);
        });

        it('Set INITIAL id, heading, isInitial', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining(payload));
        });

        it('Sets loading indication for map and straatbeeld', function () {
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(true);
            expect(newState.map.isLoading).toBe(true);
        });

        it('resets previous straatbeeld variables', function () {
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

        it('keeps detail information when starting straatbeeld', function () {
            inputState.detail = {
                endpoint: 'bag/verblijfsobject/123/',
                geometry: 'aap',
                isLoading: false
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.detail).toEqual(inputState.detail.endpoint);
        });

        it('resets search results', function () {
            inputState.search = {
                query: 'linnaeus'
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.search).toBeNull();
        });

        it('has a default heading of 0', function () {
            inputState.search = {
                query: 'linnaeus'
            };
            inputState.straatbeeld = null;
            payload.heading = null;

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD](inputState, payload);
            expect(newState.straatbeeld.heading).toBe(0);
        });
    });

    describe('SHOW_STRAATBEELD', function () {
        var payload = {
            date: new Date('2016-05-19T13:04:15.341110Z'),
            hotspots: [{
                id: 'ABC',
                heading: 179,
                distance: 3
            }],
            location: [52, 4],
            image: {
                pattern: 'http://example.com/example/{this}/{that}/{whatever}.png',
                preview: 'http://example.com/example/preview.png'
            }
        };

        beforeEach(function () {
            inputState.straatbeeld = {
                isLoading: true,
                id: 'ABC',
                heading: 123,
                isInitial: true
            };

            inputState.detail = null;
        });

        it('Adds the payload to the state', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);

            expect(newState.straatbeeld).toEqual(jasmine.objectContaining(payload));
        });

        it('set defaults for pitch, fov when oldstate is unknown', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld.pitch).toBe(0);
            expect(newState.straatbeeld.fov).toBe(79);
        });

        it('set Pitch and fov to newState when oldstate is known', function () {
            inputState.straatbeeld.pitch = 1;
            inputState.straatbeeld.fov = 2;

            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld.pitch).toBe(1);
            expect(newState.straatbeeld.fov).toBe(2);
        });

        it('sets viewcenter when no heading is known', function () {
            inputState.straatbeeld.heading = null;
            inputState.map = {};

            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.map.viewCenter).toEqual(payload.location);
        });

        it('do not overwrite isLoading, id, heading, isInitial', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);

            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: 123,
                isInitial: true
            }));
        });

        it('can set the straatbeeld to the new location', function () {
            var state = { straatbeeld: {} },
                output;

            let location = [52.001, 4.002];
            output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION](state, location);

            expect(output.straatbeeld.id).toBeNull();
            expect(output.straatbeeld.isLoading).toBe(true);
            expect(output.straatbeeld.location).toEqual(location);
            expect(output.straatbeeld.targetLocation).toEqual(location);
        });

        it('centers the map when layerselection or fullscreen map is active', function () {
            let state = {
                'map': {
                    isFullscreen: true
                }
            };
            let location = [52.001, 4.002];

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION](state, location);
            expect(newState.map.viewCenter).toEqual(location);
        });

        it('can set the straatbeeld to the new location from scratch', function () {
            var state = {},
                output;

            let location = [52.001, 4.002];
            output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION](state, location);

            expect(output.straatbeeld.id).toBeNull();
            expect(output.straatbeeld.isLoading).toBe(true);
            expect(output.straatbeeld.location).toEqual(location);
            expect(output.straatbeeld.targetLocation).toEqual(location);
        });

        it('heads towards a targetlocation', function () {
            let newState;

            inputState.straatbeeld.targetLocation = [52, 4];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: 0,
                isInitial: true
            }));

            inputState.straatbeeld.targetLocation = [52, 5];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: 90,
                isInitial: true
            }));

            inputState.straatbeeld.targetLocation = [52, 3];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: -90,
                isInitial: true
            }));

            inputState.straatbeeld.targetLocation = [53, 5];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: 45,
                isInitial: true
            }));

            inputState.straatbeeld.targetLocation = [51, 3];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: -135,
                isInitial: true
            }));

            inputState.straatbeeld.targetLocation = [51, 5];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: 135,
                isInitial: true
            }));
        });

        it('Sets loading to false', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(false);
            expect(newState.map.isLoading).toBe(false);
        });

        it('does nothing when straatbeeld is null', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);

            expect(newState.straatbeeld).toBeNull();
        });
    });

    describe('setOrientationReducer', function () {
        it('updates the orientation with pitch and fov', function () {
            inputState.straatbeeld = {};

            inputState.straatbeeld.pitch = 1;
            inputState.straatbeeld.fov = 2;

            var payload = {
                    heading: 91,
                    pitch: 1,
                    fov: 2
                },
                output;

            output = straatbeeldReducers.SET_STRAATBEELD_ORIENTATION(inputState, payload);

            expect(output.straatbeeld.pitch).toEqual(payload.pitch);
            expect(output.straatbeeld.fov).toEqual(payload.fov);
        });
    });
});
