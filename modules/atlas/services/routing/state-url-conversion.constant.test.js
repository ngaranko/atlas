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
});
