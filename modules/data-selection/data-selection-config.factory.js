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
                        label: 'Postcode'
                    }, {
                        slug: 'ggw_naam',
                        label: 'Gebiedsgerichtwerken gebied'
                    }
                ],
                FIELDS: [
                    {
                        slug: '_openbare_ruimte_naam',
                        label: 'Straatnaam'
                    },
                    {
                        slug: 'huisnummer',
                        label: 'Nr.'
                    },
                    {
                        slug: 'huisnummer_toevoeging',
                        label: 'Toev.'
                    },
                    {
                        slug: 'huisletter',
                        label: 'Ltr.'
                    },
                    {
                        slug: 'postcode',
                        label: 'Postcode'
                    },
                    {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdl.'
                    },
                    {
                        slug: 'stadsdeel_code',
                        label: 'Code'
                    },
                    {
                        slug: 'ggw_naam',
                        label: 'Gebied'
                    }//,
                    // {
                    //     slug: 'ggw_code',
                    //     label: 'Gebiedsnaam code'
                    // },
                    // {
                    //     slug: 'buurtcombinatie_naam',
                    //     label: 'Wijknaam (buurtcombinatie)'
                    // },
                    // {
                    //     slug: 'buurtcombinatie_code',
                    //     label: 'Wijk volledige code'
                    // },
                    // {
                    //     slug: 'buurt_naam',
                    //     label: 'Buurtnaam'
                    // },
                    // {
                    //     slug: 'buurt_code',
                    //     label: 'Buurt volledige code'
                    // },
                ]
            }
        };
        return angular.merge(globalConfig, envConfig[environment.NAME]);
    }
})();