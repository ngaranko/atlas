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
                    ENDPOINT_PREVIEW: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/bag/',
                    ENDPOINT_EXPORT: 'https://api-acc.datapunt.amsterdam.nl/dataselectie/bag/export/',
                    ENDPOINT_DETAIL: 'https://api-acc.datapunt.amsterdam.nl/bag/nummeraanduiding/'
                }
            },
            PRODUCTION: {
                bag: {
                    ENDPOINT_PREVIEW: 'https://api.datapunt.amsterdam.nl/dataselectie/bag/',
                    ENDPOINT_EXPORT: 'https://api.datapunt.amsterdam.nl/dataselectie/bag/export/',
                    ENDPOINT_DETAIL: 'https://api.datapunt.amsterdam.nl/bag/nummeraanduiding/'
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
                        label: 'Postcode',
                        format: {
                            filters: ['zipCode']
                        }
                    }
                ],
                FIELDS: {
                    TABLE: [
                        {
                            label: 'Naam openbare ruimte',
                            variables: ['_openbare_ruimte_naam']
                        },
                        {
                            label: 'Num.',
                            variables: ['huisnummer'],
                            format: {
                                align: 'right'
                            }
                        },
                        {
                            label: 'Let.',
                            variables: ['huisletter'],
                            format: {
                                align: 'right'
                            }
                        },
                        {
                            label: 'Toev.',
                            variables: ['huisnummer_toevoeging'],
                            format: {
                                align: 'right'
                            }
                        },
                        {
                            label: 'Postcode',
                            variables: ['postcode'],
                            format: {
                                filters: ['zipCode']
                            }
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
                                'huisnummer_toevoeging',
                                'ligplaats_id',
                                'standplaats_id',
                                'hoofdadres',
                                'status_id'
                            ],
                            format: {
                                filters: ['bagAddress']
                            }
                        },
                        {
                            variables: [
                                'ligplaats_id',
                                'standplaats_id'
                            ],
                            format: {
                                filters: ['nummeraanduidingType']
                            }
                        },
                        {
                            variables: [
                                'status_id'
                            ],
                            format: [
                                'verblijfsobjectGevormd'
                            ]
                        }
                    ]
                }
            }
        };
        return angular.merge(globalConfig, envConfig[environment.NAME]);
    }
})();
