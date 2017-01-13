describe('The urlReducers factory', function () {
    var urlReducers,
        mockedStateUrlConversion,
        stateUrlConverter,
        STATE_URL_CONVERSION;

    beforeEach(function () {
        mockedStateUrlConversion = {
            initialValues: {
                map: {
                    aap: 'noot'
                }
            },
            stateVariables: {
                s: {
                    name: 'search.mies',
                    type: 'string'
                }
            }
        };

        angular.mock.module('atlas',
            {
                stateUrlConverter: {
                    params2state: (oldState, payload) => angular.merge({}, oldState, payload)
                }
            },
            function ($provide) {
                $provide.constant('STATE_URL_CONVERSION', mockedStateUrlConversion);
            }
        );

        angular.mock.inject(function (_urlReducers_, _stateUrlConverter_, _STATE_URL_CONVERSION_) {
            urlReducers = _urlReducers_;
            stateUrlConverter = _stateUrlConverter_;
            STATE_URL_CONVERSION = _STATE_URL_CONVERSION_;
        });
    });

    describe('The URL_CHANGE reducer', function () {
        it('transforms a url into a state', function () {
            var output = urlReducers.URL_CHANGE({some: 'object'}, {someOther: 'object'});
            expect(output).toEqual(stateUrlConverter.params2state({some: 'object'}, {someOther: 'object'}));
        });
    });

    describe('The registered state initialisation methods', function () {
        it('initialize a state to the home page and default map, (only) on an empty payload', function () {
            let state;

            state = STATE_URL_CONVERSION.pre.MAIN_STATE({}, {}, {});
            expect(state).toEqual({
                page: 'home',
                map: mockedStateUrlConversion.initialValues.map
            });

            state = STATE_URL_CONVERSION.pre.MAIN_STATE({}, {}, {aap: 'noot'});
            expect(state).toEqual({});
        });

        it('initialize a search state to the previous search state if it exists', function () {
            let state;

            state = STATE_URL_CONVERSION.pre.search({aap: 'noot'}, {mies: 'teun'});
            expect(state).toEqual({aap: 'noot'});

            state = STATE_URL_CONVERSION.pre.search(null, {mies: 'teun'});
            expect(state).toEqual({mies: 'teun'});
        });
    });

    describe('The registered post processing methods', function () {
        describe('The post processing for dataSelection', function () {
            it('copies markers and isLoading from old state and determines fullscreen mode', function () {
                let oldState,
                    newState;

                oldState = {
                    markers: 'aap',
                    isLoading: 'noot'
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
