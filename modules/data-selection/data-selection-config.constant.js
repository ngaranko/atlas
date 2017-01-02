(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .factory('dataSelectionConfig', dataSelectionConfigFactory);

    dataSelectionConfigFactory.$inject = ['environment'];

    function dataSelectionConfigFactory (environment) {
        let globalConfig,
            envConfig;

        envConfig = {
            DEVELOPMENT: {
                bag: {
                    ENDPOINT_PREVIEW: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/bag/',
                    ENDPOINT_MARKERS: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/bag/geolocation/',
                    ENDPOINT_EXPORT: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/bag/export/',
                    ENDPOINT_DETAIL: 'https://api-acc.datapunt.amsterdam.nl/bag/nummeraanduiding/'
                },
                hr: {
                    ENDPOINT_PREVIEW: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/hr/',
                    ENDPOINT_EXPORT: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/hr/export/',
                    ENDPOINT_DETAIL: 'https://api-acc.datapunt.amsterdam.nl/handelsregister/vestiging/'
                }
            },
            PRODUCTION: {
                bag: {
                    ENDPOINT_PREVIEW: 'https://api.datapunt.amsterdam.nl/dataselectie/bag/',
                    ENDPOINT_MARKERS: 'https://api.datapunt.amsterdam.nl/dataselectie/bag/geolocation/',
                    ENDPOINT_EXPORT: 'https://api.datapunt.amsterdam.nl/dataselectie/bag/export/',
                    ENDPOINT_DETAIL: 'https://api.datapunt.amsterdam.nl/bag/nummeraanduiding/'
                },
                hr: {
                    ENDPOINT_PREVIEW: 'https://api.datapunt.amsterdam.nl/dataselectie/hr/',
                    ENDPOINT_EXPORT: 'https://api.datapunt.amsterdam.nl/dataselectie/hr/export/',
                    ENDPOINT_DETAIL: 'https://api.datapunt.amsterdam.nl/handelsregister/vestiging/'
                }
            }
        };
        globalConfig = {
            MAX_AVAILABLE_PAGES: 100,
            bag: {
                PRIMARY_KEY: 'id',
                TITLE: 'Adressen',
                FILTERS: [
                    {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdeel'
                    }, {
                        slug: 'ggw_naam',
                        label: 'GGW-gebied'
                    }, {
                        slug: 'buurtcombinatie_naam',
                        label: 'Buurtcombinatie'
                    }, {
                        slug: 'buurt_naam',
                        label: 'Buurt'
                    }, {
                        slug: 'naam',
                        label: 'Openbare ruimte'
                    }, {
                        slug: 'postcode',
                        label: 'Postcode'
                    }
                ],
                CONTENT: {
                    TABLE: [
                        {
                            label: 'Naam openbare ruimte',
                            variables: ['_openbare_ruimte_naam']
                        },
                        {
                            label: 'Num.',
                            variables: ['huisnummer']
                        },
                        {
                            label: 'Let.',
                            variables: ['huisletter']
                        },
                        {
                            label: 'Toev.',
                            variables: ['huisnummer_toevoeging']
                        },
                        {
                            label: 'Postcode',
                            variables: ['postcode']
                        },
                        {
                            label: 'Stadsdeel',
                            variables: ['stadsdeel_naam']
                        },
                        {
                            label: '-code',
                            variables: ['stadsdeel_code']
                        },
                        {
                            label: 'GGW-gebied',
                            variables: ['ggw_naam']
                        },
                        {
                            label: '-code',
                            variables: ['ggw_code']
                        },
                        {
                            label: 'Buurtcombinatie',
                            variables: ['buurtcombinatie_naam']
                        },
                        {
                            label: '-code',
                            variables: ['buurtcombinatie_code']
                        },
                        {
                            label: 'Buurt',
                            variables: ['buurt_naam']
                        },
                        {
                            label: '-code',
                            variables: ['buurt_code']
                        }
                    ],
                    LIST: [
                        {
                            variables: [
                                '_openbare_ruimte_naam',
                                'huisnummer',
                                'huisletter',
                                'huisnummer_toevoeging'
                            ],
                            formatter: 'bagAddress'
                        },
                        {
                            variables: [
                                'ligplaats_id',
                                'standplaats_id'
                            ],
                            formatter: 'nummeraanduidingType'
                        },
                        {
                            variables: [
                                'hoofdadres'
                            ],
                            formatter: 'nevenadres'
                        },
                        {
                            variables: [
                                'status_id'
                            ],
                            formatter: 'verblijfsobjectGevormd'
                        }
                    ]
                }
            },
            hr: {
                PRIMARY_KEY: 'id',
                TITLE: 'Handelsregister',
                FILTERS: [
                    {
                        slug: 'stadsdeel_naam',
                        label: 'Stadsdeel'
                    }, {
                        slug: 'ggw_naam',
                        label: 'GGW-gebied'
                    }, {
                        slug: 'buurtcombinatie_naam',
                        label: 'Buurtcombinatie'
                    }, {
                        slug: 'buurt_naam',
                        label: 'Buurt'
                    }, {
                        slug: 'naam',
                        label: 'Openbare ruimte'
                    }, {
                        slug: 'postcode',
                        label: 'Postcode'
                    }, {
                        slug: 'hoofdcategorie',
                        label: 'Hoofdcategorie'
                    }, {
                        slug: 'subcategorie',
                        label: 'Subcategorie'
                    }
                ],
                CONTENT: {
                    TABLE: [
                        {
                            label: 'KvK-num.',
                            variables: []
                        },
                        {
                            label: 'Handelsnaam',
                            variables: ['bedrijfsnaam']
                        },
                        {
                            label: 'Bezoekadres',
                            variables: []
                        },
                        {
                            label: 'Num.',
                            variables: []
                        },
                        {
                            label: 'Let.',
                            variables: []
                        },
                        {
                            label: 'Toev.',
                            variables: []
                        },
                        {
                            label: 'Postcode',
                            variables: []
                        },
                        {
                            label: 'Woonplaats',
                            variables: []
                        },
                        {
                            label: 'Hoofdcategorie',
                            variables: []
                        },
                        {
                            label: 'Subcategorie',
                            variables: []
                        },
                        {
                            label: 'SBI-omschrijving',
                            variables: []
                        },
                        {
                            label: 'SBI-code',
                            variables: []
                        }
                    ]
                }
            }
        };

        return angular.merge(globalConfig, envConfig[environment.NAME]);
    }
})();
