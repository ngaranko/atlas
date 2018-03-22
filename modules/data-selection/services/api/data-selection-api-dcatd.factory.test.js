describe('The dataSelectionApiDcatd factory', function () {
    let $rootScope,
        $q,
        dataSelectionApiDcatd,
        api,
        mockedApiResponse,
        config;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection',
            {
                api: {
                    getByUri: function (url) {
                        const q = $q.defer();

                        if (url === 'dcatd/reject') {
                            q.reject();
                        } else {
                            q.resolve(mockedApiResponse);
                        }

                        return q.promise;
                    }
                },
                sharedConfig: {
                    API_ROOT: 'https://api.amsterdam.nl/'
                }
            }
        );

        angular.mock.inject(function (_$rootScope_, _$q_, _dataSelectionApiDcatd_, _api_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            dataSelectionApiDcatd = _dataSelectionApiDcatd_;
            api = _api_;
        });

        config = {
            MAX_ITEMS_PER_PAGE: 2,
            ENDPOINT_PREVIEW: 'dcatd/',
            ENDPOINT_DETAIL: 'dcatd/datasets',
            PRIMARY_KEY: 'dct:identifier',
            FILTERS: [
                {
                    slug: 'groups',
                    label: 'Thema\'s'
                }, {
                    slug: 'data_format',
                    label: 'Formaten',
                    formatter: 'lowercase'
                }
            ]
        };

        mockedApiResponse = {
            '@context': {
                'ams': 'http://datacatalogus.amsterdam.nl/term/',
                'ams-dcatd': 'https://acc.api.data.amsterdam.nl/dcatd/datasets/',
                'ckan': 'https://ckan.org/terms/',
                'class': 'ams:class#',
                'dc': 'http://purl.org/dc/elements/1.1/',
                'dcat': 'http://www.w3.org/ns/dcat#',
                'dct': 'http://purl.org/dc/terms/',
                'foaf': 'http://xmlns.com/foaf/0.1/',
                'lang1': 'http://id.loc.gov/vocabulary/iso639-1/',
                'lang2': 'http://id.loc.gov/vocabulary/iso639-2/',
                'org': 'ams:org#',
                'overheid': 'http://standaarden.overheid.nl/owms/terms/',
                'overheidds': 'http://standaarden.overheid.nl/owms/terms/ds#',
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'skos': 'http://www.w3.org/2004/02/skos/core#',
                'theme': 'ams:theme#',
                'time': 'http://www.w3.org/2006/time#',
                'vcard': 'http://www.w3.org/2006/vcard/ns#',
                'dcat:dataset': {
                    '@container': '@list'
                },
                'dcat:distribution': {
                    '@container': '@set'
                },
                'dcat:keyword': {
                    '@container': '@set'
                },
                'dcat:landingpage': {
                    '@type': '@id'
                },
                'dcat:theme': {
                    '@container': '@set',
                    '@type': '@id'
                },
                'dct:issued': {
                    '@type': 'xsd:date'
                },
                'dct:language': {
                    '@type': '@id'
                },
                'dct:modified': {
                    '@type': 'xsd:date'
                },
                'foaf:homepage': {
                    '@type': '@id'
                },
                'foaf:mbox': {
                    '@type': '@id'
                },
                'vcard:hasEmail': {
                    '@type': '@id'
                },
                'vcard:hasURL': {
                    '@type': '@id'
                },
                'vcard:hasLogo': {
                    '@type': '@id'
                }
            },
            'dcat:dataset': [
                {
                    '@id': 'ams-dcatd:642f15c7-8368-4795-9e3d-1a87fa7e562a',
                    'dct:description': '<p>Alle activiteiten in Amsterdam en omgeving...</p>',
                    'dct:identifier': '642f15c7-8368-4795-9e3d-1a87fa7e562a',
                    'dct:title': 'Activiteiten'
                },
                {
                    '@id': 'ams-dcatd:a968ab7f-d891-4502-b103-0f78dcc58fb8',
                    'dct:description': '<p>Alle restaurants en cafes in Amsterdam en omgeving...</p>',
                    'dct:identifier': 'a968ab7f-d891-4502-b103-0f78dcc58fb8',
                    'dct:title': 'Eten en Drinken'
                },
                {
                    '@id': 'ams-dcatd:5b1174ee-901b-47de-abfb-14548bfcb7fb',
                    'dct:description': '<p>Alle evenementen in Amsterdam en omgeving...</p>',
                    'dct:identifier': '5b1174ee-901b-47de-abfb-14548bfcb7fb',
                    'dct:title': 'Evenementen in Amsterdam'
                },
                {
                    '@id': 'ams-dcatd:d7a4c93c-0d7f-4d39-82d4-5f50eaffa624',
                    'dct:description': '<p>Alle attracties in Amsterdam en omgeving...</p>',
                    'dct:identifier': 'd7a4c93c-0d7f-4d39-82d4-5f50eaffa624',
                    'dct:title': 'Attracties'
                }
            ]
        };

        spyOn(api, 'getByUri').and.callThrough();
    });

    it('calls the api factory with available no parameters', function () {
        // Without active filters
        dataSelectionApiDcatd.query(config, {}, 1);
        expect(api.getByUri).toHaveBeenCalledWith('dcatd/', {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE
        });

        api.getByUri.calls.reset();
    });

    it('calls the api factory with theme parameter and searchText', function () {
        // With an active filter and search text
        dataSelectionApiDcatd.query(config, { groups: 'energie' }, 1, 'searchText');
        expect(api.getByUri).toHaveBeenCalledWith('dcatd/', {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            '/properties/dcat:theme/items': 'eq=theme:energie',
            q: 'searchText'
        });

        api.getByUri.calls.reset();
    });

    it('calls the api factory with active filters and searchText', function () {
        // With active filters
        dataSelectionApiDcatd.query(config, { groups: 'energie', data_format: 'application/pdf' }, 1, 'searchText');
        expect(api.getByUri).toHaveBeenCalledWith('dcatd/', {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            '/properties/dcat:theme/items': 'eq=theme:energie',
            '/properties/dcat:distribution/items/properties/dct:format': 'eq=application/pdf',
            q: 'searchText'
        });

        api.getByUri.calls.reset();

        // With another page
        dataSelectionApiDcatd.query(config, {}, 2, 'searchText');
        expect(api.getByUri).toHaveBeenCalledWith('dcatd/', {
            offset: 2,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText'
        });
    });

    it('returns the total number of pages', function () {
        let output;

        dataSelectionApiDcatd.query(config, {}, 1).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(output.numberOfPages).toBe(2);
    });

    it('registers an error with an unsuccessful API call', () => {
        let thenCalled = false,
            catchCalled = false;

        config.ENDPOINT_PREVIEW += 'reject';

        dataSelectionApiDcatd.query(config, {}, 1).then(() => {
            thenCalled = true;
        }, () => {
            catchCalled = true;
        });
        $rootScope.$apply();

        expect(thenCalled).toBe(false);
        expect(catchCalled).toBe(true);
    });

    it('registers an error with an unsuccessful response', () => {
        let thenCalled = false,
            catchCalled = false;

        mockedApiResponse['dcat:dataset'] = [];

        dataSelectionApiDcatd.query(config, {}, 1).then(() => {
            thenCalled = true;
        }, () => {
            catchCalled = true;
        });
        $rootScope.$apply();

        expect(thenCalled).toBe(false);
        expect(catchCalled).toBe(true);
    });

    it('processes the results correctly', function () {
        let output = {};

        dataSelectionApiDcatd.query(config, {}, 1).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(output.data.length).toEqual(4);
        expect(output.data[0]).toEqual({
            _links: {
                self: {
                    href: 'https://api.amsterdam.nl/dcatd/datasets/642f15c7-8368-4795-9e3d-1a87fa7e562a'
                }
            },
            '@id': 'ams-dcatd:642f15c7-8368-4795-9e3d-1a87fa7e562a',
            'dct:description': '<p>Alle activiteiten in Amsterdam en omgeving...</p>',
            'dct:identifier': '642f15c7-8368-4795-9e3d-1a87fa7e562a',
            'dct:title': 'Activiteiten'
        });
    });

    describe('the formatFilters process', function () {
        it('orders the filters based on the configuration', function () {
            let output = {};

            dataSelectionApiDcatd.query(config, {}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.filters).toEqual({
                groups: {
                    numberOfOptions: 2,
                    options: [{
                        id: 'geografie',
                        label: 'Geografie',
                        count: 1
                    }, {
                        id: 'energie',
                        label: 'Energie',
                        count: 1
                    }
                    ]
                },
                data_format: {
                    numberOfOptions: 2,
                    options: [{
                        id: 'application/pdf',
                        label: 'pdf',
                        count: 1
                    },
                    {
                        id: 'text/csv',
                        label: 'csv',
                        count: 1
                    }]
                }
            });
        });

        it('won\'t return filters from the configuration that are not part of the API\'s response', function () {
            let output = {};

            // With only one filter in the API response
            dataSelectionApiDcatd.query(config, { groups: 'energie' }, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.filters).toEqual({
                data_format: {
                    numberOfOptions: 2,
                    options: [{
                        id: 'application/pdf',
                        label: 'pdf',
                        count: 1
                    },
                    {
                        id: 'text/csv',
                        label: 'csv',
                        count: 1
                    }]
                }
            });
        });
    });
});
