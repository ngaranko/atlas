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
                        slug: 'stadsdeel_naam',
                        label: 'Gebied'
                    }, {
                        slug: 'buurtcombinatie_naam',
                        label: 'Buurtcombinatie'
                    }, {
                        slug: 'buurt_naam',
                        label: 'Buurt'
                    }, {
                        slug: 'naam',
                        label: 'Straatnaam'
                    }, {
                        slug: 'postcode',
                        label: 'Postcode',
                        format: {
                            filters: ['postcode', 'isempty']
                        }
                    }, {
                        slug: 'ggw_naam',
                        label: 'GGW-gebied'
                    }
                ],
                FIELDS: [
                    {
                        slug: '_openbare_ruimte_naam',
                        label: 'Straatnaam'
                    },
                    {
                        slug: 'huisnummer',
                        label: 'Nr.',
                        format: {
                            align: 'right'
                        }
                    },
                    {
                        slug: 'huisnummer_toevoeging',
                        label: 'Toev.',
                        format: {
                            align: 'right'
                        }
                    },
                    {
                        slug: 'huisletter',
                        label: 'Ltr.',
                        format: {
                            align: 'right'
                        }
                    },
                    {
                        slug: 'postcode',
                        label: 'Postcode',
                        format: {
                            filters: ['postcode', 'isempty']
                        }
                    },
                    {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdl.'
                    },
                    {
                        slug: 'stadsdeel_code',
                        label: '-code'
                    },
                    {
                        slug: 'ggw_naam',
                        label: 'Gebied'
                    },
                    {
                        slug: 'ggw_code',
                        label: '-code'
                    },
                    {
                        slug: 'buurtcombinatie_naam',
                        label: 'Buurtcombinatie'
                    },
                    {
                        slug: 'buurtcombinatie_code',
                        label: '-code'
                    },
                    {
                        slug: 'buurt_naam',
                        label: 'Buurt'
                    },
                    {
                        slug: 'buurt_code',
                        label: '-code'
                    },
                ]
            }
        };
        return angular.merge(globalConfig, envConfig[environment.NAME]);
    }
})();