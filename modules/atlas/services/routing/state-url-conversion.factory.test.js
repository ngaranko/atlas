describe('The state url conversion factory', function () {
    let STATE_URL_CONVERSION,
        dpBaseCoder,
        stateUrlConverter;

    let mockedStateUrlConversion = {
        initialValue: {
            state: {
                aap: 'noot'
            },
            xyz: {
                mies: 'teun'
            }
        },
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
                type: 'number[][]'
            },
            v: {
                name: 'v',
                type: 'string',
                getValue: v => 'getValue.' + v,
                setValue: v => 'setValue.' + v
            }
        }
    };

    let getCoderForBase = {

    };

    let mockedDpBaseCoder = {
        getCoderForBase: n => getCoderForBase
    };

    beforeEach(function () {
        angular.mock.module('atlas',
            function ($provide) {
                $provide.constant('STATE_URL_CONVERSION', mockedStateUrlConversion);
            }
        );

        angular.mock.module('dpShared', {
            dpBaseCoder: mockedDpBaseCoder
        });

        angular.mock.inject(function (_STATE_URL_CONVERSION_, _dpBaseCoder_, _stateUrlConverter_) {
            STATE_URL_CONVERSION = _STATE_URL_CONVERSION_;
            dpBaseCoder = _dpBaseCoder_;
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
            console.log(STATE_URL_CONVERSION);
            let params = stateUrlConverter.state2params({
                s: 'aap',
                x: {
                    b: true
                }
            });
            expect(params).toEqual({});
        });
    });

    describe('The params to state translation', function () {
        beforeEach(function () {

        });

        it('can translate string values', function () {

        });
    });
});
