describe('The state url conversion definition', function () {
    let STATE_URL_CONVERSION;

    beforeEach(function () {
        angular.mock.module('atlas', {});

        angular.mock.inject(function (_STATE_URL_CONVERSION_) {
            STATE_URL_CONVERSION = _STATE_URL_CONVERSION_;
        });
    });

    it('contains code to transform dataSelection filters', function () {
        [
            {
                filters: {},
                conversion: []
            },
            {
                conversion: []
            },
            {
                filters: {
                    aap: 'noot',
                    mies: 'teun'
                },
                conversion: [
                    ['aap', 'noot'],
                    ['mies', 'teun']
                ]
            }
        ].forEach(({filters, conversion}) => {
            expect(STATE_URL_CONVERSION.stateVariables.dsf.getValue(filters)).toEqual(conversion);
            expect(STATE_URL_CONVERSION.stateVariables.dsf.setValue(conversion)).toEqual(filters || {});
        });
    });

    it('contains code to transform map overlays', function () {
        [
            {
                overlays: [],
                conversion: []
            },
            {
                conversion: []
            },
            {
                overlays: [
                    {
                        id: 'aap',
                        isVisible: true
                    },
                    {
                        id: 'noot',
                        isVisible: false
                    }
                ],
                conversion: [
                    ['aap', 'T'],
                    ['noot', 'F']
                ]
            }
        ].forEach(({overlays, conversion}) => {
            expect(STATE_URL_CONVERSION.stateVariables.mpo.getValue(overlays)).toEqual(conversion);
            expect(STATE_URL_CONVERSION.stateVariables.mpo.setValue(conversion)).toEqual(overlays || []);
        });
    });

    describe('The registered state initialisation methods', function () {
        it('initialize a state to the home page and default map, (only) on an empty payload', function () {
            let state;

            state = STATE_URL_CONVERSION.onCreate.atlas({}, {}, {}, STATE_URL_CONVERSION.initialValues);
            expect(state).toEqual({
                page: 'home',
                map: {
                    viewCenter: [52.3719, 4.9012],
                    baseLayer: 'topografie',
                    zoom: 9,
                    overlays: [],
                    isFullscreen: false,
                    isLoading: false,
                    showActiveOverlays: false
                }
            });

            state = STATE_URL_CONVERSION.onCreate.atlas({}, {}, {aap: 'noot'});
            expect(state).toEqual({});
        });

        it('initialize a search state to the previous search state if it exists', function () {
            let state;

            state = STATE_URL_CONVERSION.onCreate.search({aap: 'noot'}, {});
            expect(state).toEqual({aap: 'noot'});

            state = STATE_URL_CONVERSION.onCreate.search(null, {mies: 'teun'});
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
