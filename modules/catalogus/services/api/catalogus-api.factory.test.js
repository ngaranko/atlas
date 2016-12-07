describe('The catalogusApi factory', function () {
    let $rootScope,
        $q,
        catalogusApi,
        api,
        mockedApiResponse;

    beforeEach(function () {
        angular.mock.module(
            'dpCatalogus',
            {
                api: {
                    getByUrl: function () {
                        let q = $q.defer();

                        q.resolve(mockedApiResponse);

                        return q.promise;
                    }
                }
            },
            function ($provide) {
                $provide.constant('catalogusConfig', {
                    MAX_ITEMS_PER_PAGE: 2,
                    ENDPOINT_PREVIEW: 'https://api.amsterdam.nl/zwembaden/',
                    ENDPOINT_DETAIL: 'https://amsterdam.nl/api_endpoint/zwembaden/',
                    PRIMARY_KEY: 'id',
                    FILTERS: [
                        {
                            slug: 'res_format',
                            label: 'Resource format'
                        }, {
                            slug: 'organization',
                            label: 'Organization'
                        }
                    ],
                    CONTENT: [
                        {
                            label: 'Adres',
                            variables: ['adres']
                        },
                        {
                            label: 'Openingstijden',
                            variables: ['openingstijden'],
                            formatter: 'openingstijdenFormatter'
                        }
                    ]
                });
            }
        );

        angular.mock.inject(function (_$rootScope_, _$q_, _catalogusApi_, _api_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            catalogusApi = _catalogusApi_;
            api = _api_;
        });

        mockedApiResponse = {
            success: true,
            result: {
                count: 3,
                search_facets: {
                    organization: {
                        items: [
                            {
                                count: 1,
                                display_name: 'Tropisch'
                            }, {
                                count: 4,
                                display_name: 'Verwarmd'
                            }, {
                                count: 1,
                                display_name: 'Koud'
                            }
                        ]
                    },
                    res_format: {
                        items: [
                            {
                                count: 4,
                                display_name: 'Buitenbad'
                            },
                            {
                                count: 2,
                                display_name: 'Overdekt'
                            }
                        ]
                    }
                },
                results: [
                    {
                        _openbare_ruimte_naam: 'Binnenkant',
                        huisletter: 'A',
                        huisnummer: '1',
                        huisnummer_toevoeging: '2',
                        ligplaats_id: '',
                        standplaats_id: '0123456',
                        openingstijden: 'Alleen op dinsdag',
                        adres: 'Sneeuwbalweg 24',
                        id: '1'
                    }, {
                        _openbare_ruimte_naam: 'Binnenkant',
                        huisletter: 'B',
                        huisnummer: '1',
                        huisnummer_toevoeging: '',
                        ligplaats_id: '0123456',
                        standplaats_id: '',
                        hoofdadres: 'False',
                        status_id: '18',
                        adres: 'Marnixstraat 1',
                        openingstijden: 'Ligt er een beetje aan',
                        id: '2'
                    }, {
                        _openbare_ruimte_naam: 'Binnenkant',
                        huisletter: 'C',
                        huisnummer: '1',
                        huisnummer_toevoeging: '2',
                        ligplaats_id: '',
                        standplaats_id: '0123456',
                        hoofdadres: 'True',
                        status_id: '16',
                        openingstijden: 'Alleen op dinsdag',
                        adres: 'Sneeuwbalweg 24',
                        id: '1'
                    }
                ]
            }
        };

        spyOn(api, 'getByUrl').and.callThrough();
    });

    it('calls the api factory with the active filters and page as searchParams', function () {
        // Without active filters
        catalogusApi.query({}, 1);
        expect(api.getByUrl).toHaveBeenCalledWith('https://api.amsterdam.nl/zwembaden/', jasmine.objectContaining({
            start: 0,
            fq: ''
        }));

        // With active filters
        catalogusApi.query({water: 'Verwarmd'}, 1);
        expect(api.getByUrl).toHaveBeenCalledWith('https://api.amsterdam.nl/zwembaden/', jasmine.objectContaining({
            start: 0,
            fq: 'water:Verwarmd'
        }));

        // With another page
        catalogusApi.query({water: 'Verwarmd'}, 2);
        expect(api.getByUrl).toHaveBeenCalledWith('https://api.amsterdam.nl/zwembaden/', jasmine.objectContaining({
            start: 2,
            fq: 'water:Verwarmd'
        }));
    });

    it('returns the total number of pages', function () {
        let output;

        catalogusApi.query({}, 1).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(output.number_of_pages).toBe(2);
    });

    describe('it returns all available filters', function () {
        it('orders the filters based on the configuration', function () {
            let output = {};

            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.filters).toEqual([
                {
                    slug: 'res_format',
                    label: 'Resource format',
                    numberOfOptions: 2,
                    options: [
                        {
                            label: 'Buitenbad',
                            count: 4
                        },
                        {
                            label: 'Overdekt',
                            count: 2
                        }
                    ]
                }, {
                    slug: 'organization',
                    label: 'Organization',
                    numberOfOptions: 3,
                    options: [
                        {
                            label: 'Tropisch',
                            count: 1
                        }, {
                            label: 'Verwarmd',
                            count: 4
                        }, {
                            label: 'Koud',
                            count: 1
                        }
                    ]
                }
            ]);
        });

        it('won\'t return filters from the configuration that are not part of the API\'s response', function () {
            let output = {};

            // With both filters in the response
            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.filters.length).toBe(2);
            expect(output.filters[0].slug).toBe('res_format');
            expect(output.filters[1].slug).toBe('organization');

            // With only one filter in the API response
            delete mockedApiResponse.result.search_facets.res_format;

            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.filters.length).toBe(1);
            expect(output.filters[0].slug).toBe('organization');
        });

        it('returns the number of results per category (e.g. there a 12 buurten)', function () {
            let output = {};

            // With both filters in the response
            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.filters[0].slug).toBe('res_format');
            expect(output.filters[0].numberOfOptions).toBe(2);

            expect(output.filters[1].slug).toBe('organization');
            expect(output.filters[1].numberOfOptions).toBe(3);
        });
    });

    describe('it returns the data', function () {
        it('has a single row for the head of the table based on the configuration', function () {
            let output;

            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.data.head).toEqual(['Adres', 'Openingstijden']);
        });

        it('reorders the results per row from the API to match the order of the configuration', function () {
            let output = {};

            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.data.body.length).toBe(3);
            expect(output.data.body[0]).toEqual({
                detailEndpoint: 'https://amsterdam.nl/api_endpoint/zwembaden/1/',
                content: [
                    [{
                        key: 'adres',
                        value: 'Sneeuwbalweg 24'
                    }], [{
                        key: 'openingstijden',
                        value: 'Alleen op dinsdag'
                    }]
                ]
            });
            expect(output.data.body[1]).toEqual({
                detailEndpoint: 'https://amsterdam.nl/api_endpoint/zwembaden/2/',
                content: [
                    [{
                        key: 'adres',
                        value: 'Marnixstraat 1'
                    }], [{
                        key: 'openingstijden',
                        value: 'Ligt er een beetje aan'
                    }]
                ]
            });
        });

        it('returns the formatters for each group of variables', function () {
            let output;

            catalogusApi.query({}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.data.formatters).toEqual([undefined, 'openingstijdenFormatter']);
        });
    });
});
