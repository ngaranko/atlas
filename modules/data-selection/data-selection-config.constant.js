(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .constant('DATA_SELECTION_CONFIG', {
            MAX_AVAILABLE_PAGES: 100,
            bag: {
                CUSTOM_API: 'dataSelectionApiDataSelection',
                ENDPOINT_PREVIEW: 'dataselectie/bag/',
                ENDPOINT_MARKERS: 'dataselectie/bag/geolocation/',
                ENDPOINT_EXPORT: 'https://api.datapunt.amsterdam.nl/dataselectie/bag/export/',
                ENDPOINT_DETAIL: 'bag/nummeraanduiding/',
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
                CUSTOM_API: 'dataSelectionApiDataSelection',
                ENDPOINT_PREVIEW: 'dataselectie/hr/',
                ENDPOINT_EXPORT: 'https://api.datapunt.amsterdam.nl/dataselectie/hr/export/',
                ENDPOINT_DETAIL: 'handelsregister/vestiging/',
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
                        /*
                        {
                            label: 'KvK-num.',
                            variables: []
                        },
                        */
                        {
                            label: 'Handelsnaam',
                            variables: ['bedrijfsnaam']
                        },
                        /*
                        {
                            label: 'Bezoekadres',
                            variables: ['bezoekadres_volledig_adres']
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
                        */
                        {
                            label: 'Hoofdcategorie',
                            variables: ['hoofdcategorieen']
                        },
                        {
                            label: 'Subcategorie',
                            variables: ['subcategorieen']
                        },
                        /*
                        {
                            label: 'SBI-omschrijving',
                            variables: []
                        },
                        {
                            label: 'SBI-code',
                            variables: ['sbicodes']
                        }
                        */
                    ]
                }
            }
        });
})();
