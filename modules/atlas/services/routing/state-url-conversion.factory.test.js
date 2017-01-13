describe('The state url conversion factory', function () {
    let stateUrlConverter,
        mockedStateUrlConversion;

    beforeEach(function () {
        mockedStateUrlConversion = {
            pre: {},
            post: {},
            initialValues: {},
            stateVariables: {
                s: {
                    name: 's',
                    type: 'string'
                },
                b: {
                    name: 'x.b',
                    type: 'boolean'
                },
                n: {
                    name: 'x.y.n',
                    type: 'number'
                },
                n1: {
                    name: 'x.y.n1',
                    type: 'number',
                    precision: 1
                },
                b62: {
                    name: 'x.y.z.b62',
                    type: 'base62',
                    precision: 1
                },
                as: {
                    name: 'as',
                    type: 'string[]'
                },
                aab: {
                    name: 'aab',
                    type: 'boolean[][]'
                },
                aaan: {
                    name: 'aaan',
                    type: 'number[][][]'
                },
                v: {
                    name: 'v',
                    type: 'string',
                    getValue: v => 'getValue.' + v,
                    setValue: v => 'setValue.' + v
                }
            }
        };

        angular.mock.module('atlas',
            function ($provide) {
                $provide.constant('STATE_URL_CONVERSION', mockedStateUrlConversion);
            }
        );

        angular.mock.inject(function (_STATE_URL_CONVERSION_, _dpBaseCoder_, _stateUrlConverter_) {
            stateUrlConverter = _stateUrlConverter_;
        });
    });

    describe('The state to params translation', function () {
        beforeEach(function () {

        });

        it('translates an empty state to empty params', function () {
            let params = stateUrlConverter.state2params({});
            expect(params).toEqual({});
        });

        it('translates a state to the corresponding params', function () {
            let params = stateUrlConverter.state2params({
                s: 'aap',
                x: {
                    b: true,
                    y: {
                        n: 10,
                        n1: 1.234,
                        z: {
                            b62: 62
                        }
                    }
                },
                as: ['aap', 'noot', 'mies'],
                aab: [[true, false], [false, true]],
                aaan: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
                v: 'v'
            });

            expect(params).toEqual({
                s: 'aap',
                b: 'T',
                n: '10',
                n1: '1.2',
                b62: 'A0',
                as: 'aap:noot:mies',
                aab: 'T::F:F::T',
                aaan: '1:::2::3:::4:5:::6::7:::8',
                v: 'getValue.v'
            });
        });

        it('skips empty values for strings and arrays', function () {
            let params = stateUrlConverter.state2params({
                s: '',
                as: []
            });

            expect(params).toEqual({});
        });

        it('skips values of unknown type', function () {
            mockedStateUrlConversion.stateVariables.s.type = 'string1';
            let params = stateUrlConverter.state2params({
                s: 'aap'
            });

            expect(params).toEqual({});
        });
    });

    describe('The params to state translation', function () {
        beforeEach(function () {

        });

        it('translates empty params to an empty state', function () {
            let state = stateUrlConverter.params2state({}, {});
            expect(state).toEqual({});
        });

        it('translates params to the corresponding state', function () {
            let state = stateUrlConverter.params2state({}, {
                s: 'aap',
                b: 'T',
                n: '10',
                n1: '1.2',
                b62: 'A0',
                as: 'aap:noot:mies',
                aab: 'T::F:F::T',
                aaan: '1:::2::3:::4:5:::6::7:::8',
                v: 'v'
            });

            expect(state).toEqual({
                s: 'aap',
                x: {
                    b: true,
                    y: {
                        n: 10,
                        n1: 1.2,
                        z: {
                            b62: 62
                        }
                    }
                },
                as: ['aap', 'noot', 'mies'],
                aab: [[true, false], [false, true]],
                aaan: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
                v: 'setValue.v'
            });
        });

        it('can use initialValues to initialize a state object', function () {
            mockedStateUrlConversion.initialValues = {
                x: {
                    aap: 'noot'
                }
            };

            let state = stateUrlConverter.params2state({}, {b: 'T'});
            expect(state).toEqual({
                x: {
                    aap: 'noot',
                    b: true
                }
            });
        });

        it('uses MAIN_STATE initialValues to denote the main part of the state object', function () {
            mockedStateUrlConversion.initialValues = {
                MAIN_STATE: {
                    aap: 'noot'
                }
            };

            let state = stateUrlConverter.params2state({}, {});
            expect(state).toEqual({
                aap: 'noot'
            });
        });

        it('initializes non-used initialValues to null', function () {
            mockedStateUrlConversion.initialValues = {
                xyz: {
                    mies: 'teun'
                }
            };

            let state = stateUrlConverter.params2state({}, {});
            expect(state).toEqual({
                xyz: null
            });
        });

        it('can use a pre method to inialize a state object', function () {
            mockedStateUrlConversion.pre = {
                x: (oldState, newState) => {
                    newState.mies = oldState.aap + ', ' + newState.aap;
                    return newState;
                }
            };

            mockedStateUrlConversion.initialValues = {
                x: {
                    aap: 'new noot'
                }
            };

            let state = stateUrlConverter.params2state({
                x: {
                    aap: 'old noot'
                }
            }, {b: 'T'});
            expect(state).toEqual({
                x: {
                    aap: 'new noot',
                    mies: 'old noot, new noot',
                    b: true
                }
            });
        });

        it('supplies the payload to a pre method for the main state object', function () {
            mockedStateUrlConversion.pre = {
                MAIN_STATE: (oldState, newState, params) => {
                    newState.mies = oldState.aap + ', ' + newState.aap + ', ' + params.s;
                    return newState;
                }
            };
            mockedStateUrlConversion.initialValues = {
                MAIN_STATE: {
                    aap: 'new noot'
                }
            };

            let state = stateUrlConverter.params2state({
                aap: 'old noot'
            }, {s: 'mies'});
            expect(state).toEqual({
                aap: 'new noot',
                mies: 'old noot, new noot, mies',
                s: 'mies'
            });
        });

        it('can use a post method to post process a state when all conversion has finished', function () {
            let onlyPostForStates = true;
            mockedStateUrlConversion.post = {
                x: (oldState, newState) => {
                    newState.mies = oldState.aap + ', ' + newState.aap + ', ' + newState.b;
                },
                y: () => {
                    onlyPostForStates = false;
                }
            };

            mockedStateUrlConversion.initialValues = {
                x: {
                    aap: 'new noot'
                }
            };

            let state = stateUrlConverter.params2state({
                x: {
                    aap: 'old noot'
                }
            }, {b: 'T'});
            expect(state).toEqual({
                x: {
                    aap: 'new noot',
                    mies: 'old noot, new noot, true',
                    b: true
                }
            });
            expect(onlyPostForStates).toBe(true);
        });

        it('skips values of unknown type', function () {
            mockedStateUrlConversion.stateVariables.s.type = 'string1';
            let state = stateUrlConverter.params2state({}, {s: 'mies'});
            expect(state).toEqual({});
        });

        it('restores empty values for multidimensional arrays', function () {
            let state = stateUrlConverter.params2state({}, {
                aab: 'T::F'
            });
            expect(state).toEqual({
                aab: [[true, false]]
            });
        });
    });
});
