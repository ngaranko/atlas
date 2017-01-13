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

            state = STATE_URL_CONVERSION.pre.MAIN_STATE({}, {mies: 'teun'});
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
            });
        });
    });
});
