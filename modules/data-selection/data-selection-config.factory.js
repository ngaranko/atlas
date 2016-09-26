(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .factory('dataSelectionConfig', dataSelectionConfigFactory);

    dataSelectionConfigFactory.$inject = ['environment'];

    function dataSelectionConfigFactory (environment) {
        var globalConfig,
            envConfig;

        envConfig = {
            DEVELOPMENT: {
                bag: {
                    ENDPOINT_PREVIEW: 'https://api-acc.datapunt.amsterdam.nl/zelfbediening/bag/',
                    ENDPOINT_EXPORT: 'https://api-acc.datapunt.amsterdam.nl/zelfbediening/bag/export/',
                    ENDPOINT_DETAIL: 'https://api-acc.datapunt.amsterdam.nl/bag/nummeraanduiding/'
                }
            },
            PRODUCTION: {
                bag: {
                    ENDPOINT_PREVIEW: 'https://api.datapunt.amsterdam.nl/zelfbediening/bag/',
                    ENDPOINT_EXPORT: 'https://api.datapunt.amsterdam.nl/zelfbediening/bag/export/',
                    ENDPOINT_DETAIL: 'https://api.datapunt.amsterdam.nl/bag/nummeraanduiding/'
                }
            }
        };
        globalConfig = {
            bag: {
                PRIMARY_KEY: 'id',
                FILTERS: [
                    {
                        slug: 'woonplaats',
                        label: 'Woonplaats'
                    }, {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdelen'
                    }, {
                        slug: 'ggw_naam',
                        label: 'Gebieden'
                    }, {
                        slug: 'buurtcombinatie_naam',
                        label: 'Buurtcombinaties'
                    }, {
                        slug: 'buurt_naam',
                        label: 'Buurten'
                    }, {
                        slug: 'naam',
                        label: 'Straatnamen'
                    }, {
                        slug: 'postcode',
                        label: 'Postcode'
                    }
                ],
                FIELDS: [
                    {
                        slug: '_openbare_ruimte_naam',
                        label: 'Openbare ruimte'
                    }, {
                        slug: 'huisnummer',
                        label: 'Num.'
                    }, {
                        slug: 'huisletter',
                        label: 'Let.'
                    }, {
                        slug: 'huisnummer_toevoeging',
                        label: 'Toev.'
                    }, {
                        slug: 'postcode',
                        label: 'Postcode'
                    }, {
                        slug: 'woonplaats',
                        label: 'Woonplaats'
                    }, {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdeel'
                    }, {
                        slug: 'stadsdeel_code',
                        label: '-code'
                    }, {
                        slug: 'ggw_naam',
                        label: 'G.G.W. gebied'
                    }, {
                        slug: 'ggw_code',
                        label: '-code'
                    }, {
                        slug: 'buurtcombinatie_naam',
                        label: 'Buurtcombintaie'
                    }, {
                        slug: 'buurtcombinatie_code',
                        label: '-code'
                    }, {
                        slug: 'buurt_naam',
                        label: 'Buurt'
                    }, {
                        slug: 'buurt_code',
                        label: '-code'
                    }
                ]
            }
        };
        return angular.merge(globalConfig, envConfig[environment.NAME]);
    }
})();