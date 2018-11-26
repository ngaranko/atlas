import mockedApiResponseJson from './data-selection-api-dcatd.factory.test.response';

describe('The dataSelectionApiDcatd factory', function () {
    let $rootScope,
        $q,
        dataSelectionApiDcatd,
        api,
        mockedApiResponse,
        mockedEmptyApiResponse,
        config,
        catalogFilters;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection', {
                api: {
                    getByUri: function (url) {
                        const q = $q.defer();
                        if (url === 'dcatd/reject') {
                            q.reject();
                        } else if (url === 'dcatd/empty') {
                            q.resolve(mockedEmptyApiResponse);
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
            ENDPOINT_PREVIEW: 'dcatd/datasets',
            ENDPOINT_DETAIL: 'dcatd/datasets',
            ENDPOINT_METADATA: 'dcatd/openapi',
            PRIMARY_KEY: 'dct:identifier',
            FILTERS: [{
                slug: 'groups',
                label: 'Thema\'s'
            }, {
                slug: 'data_format',
                label: 'Formaten',
                formatter: 'lowercase'
            }, {
                slug: 'owner',
                label: 'Gepubliceerd door'
            }]
        };

        catalogFilters = {
            statusTypes: [{
                id: 'id',
                label: 'label'
            }],
            groupTypes: [{
                id: 'milieu-water',
                label: 'Thema\'s'
            }],
            formatTypes: [{
                id: 'id',
                label: 'label'
            }],
            serviceTypes: [{
                id: 'id',
                label: 'label'
            }],
            resourceTypes: [{
                id: 'id',
                label: 'label'
            }],
            ownerTypes: [{
                id: 'id',
                label: 'label'
            }],
            licenseTypes: [{
                id: 'id',
                label: 'label'
            }],
            distributionTypes: [{
                id: 'id',
                label: 'label'
            }]
        };

        mockedApiResponse = {
            ...mockedApiResponseJson
        };

        mockedEmptyApiResponse = {
            ...mockedApiResponseJson,
            'ams:facet_info': {}
        };
        spyOn(api, 'getByUri').and.callThrough();
    });

    it('calls the api factory with when no parameters are provided', function () {
        let output;

        dataSelectionApiDcatd.query(config, 'CATALOG', {}, 1).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(Object.keys(output.filters).length).toBe(0);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE
        });
    });

    it('calls the api factory with theme parameter and searchText', function () {
        // With an active filter and search text
        dataSelectionApiDcatd.query(config, 'CATALOG', {
            groups: 'energie'
        }, 1, 'searchText', undefined, catalogFilters);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText',
            '/properties/dcat:theme/items': 'eq=theme:energie'
        });
    });

    it('calls the api factory with active filters and searchText', function () {
        // With active filters
        dataSelectionApiDcatd.query(config, 'CATALOG', {
            groups: 'energie',
            formats: 'application/pdf'
        }, 1, 'searchText', undefined, catalogFilters);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText',
            '/properties/dcat:theme/items': 'eq=theme:energie',
            '/properties/dcat:distribution/items/properties/dcat:mediaType': 'eq=application/pdf'
        });

        api.getByUri.calls.reset();

        // With another page
        dataSelectionApiDcatd.query(config, 'CATALOG', {}, 2, 'searchText', undefined, catalogFilters);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 2,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText'
        });
    });

    it('calls the api factory with owner parameter and searchText', function () {
        // With an active filter and search text
        dataSelectionApiDcatd.query(config, 'CATALOG', {
            owners: 'owner'
        }, 1, 'searchText', undefined, catalogFilters);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText',
            '/properties/ams:owner': 'eq=owner'
        });
    });

    it('calls the api factory with serviceType parameter and searchText', function () {
        // With an active filter and search text
        dataSelectionApiDcatd.query(config, 'CATALOG', {
            serviceTypes: 'wms'
        }, 1, 'searchText', undefined, catalogFilters);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText',
            '/properties/dcat:distribution/items/properties/ams:serviceType': 'eq=wms'
        });
    });

    it('calls the api factory with distributionType parameter and searchText', function () {
        // With an active filter and search text
        dataSelectionApiDcatd.query(config, 'CATALOG', {
            distributionTypes: 'file'
        }, 1, 'searchText', undefined, catalogFilters);
        expect(api.getByUri).toHaveBeenCalledWith(config.ENDPOINT_PREVIEW, {
            offset: 0,
            limit: config.MAX_ITEMS_PER_PAGE,
            q: 'searchText',
            '/properties/dcat:distribution/items/properties/ams:distributionType': 'eq=file'
        });
    });

    it('returns the total number of pages', function () {
        let output;

        dataSelectionApiDcatd.query(config, 'CATALOG', {}, 1, '', undefined, catalogFilters).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(output.numberOfPages).toBe(2);
    });

    it('still returns the total number of pages when facet_info is empty', function () {
        let output;

        config.ENDPOINT_PREVIEW = 'dcatd/empty';

        dataSelectionApiDcatd.query(config, 'CATALOG', {}, 1, '', undefined, catalogFilters).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(output.numberOfPages).toBe(2);
    });

    it('registers an error with an unsuccessful API call', () => {
        let thenCalled = false,
            catchCalled = false;

        config.ENDPOINT_PREVIEW = 'dcatd/reject';

        dataSelectionApiDcatd.query(config, 'CATALOG', {}, 1, '', undefined, catalogFilters).then(() => {
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

        dataSelectionApiDcatd.query(config, 'CATALOG', {}, 1, '', undefined, catalogFilters).then(function (_output_) {
            output = _output_;
        });
        $rootScope.$apply();

        expect(output.data.length).toEqual(4);
        expect(output.data[0]).toEqual({
            '@id': 'ams-dcatd: 642f15c7-8368-4795-9e3d-1a87fa7e562a',
            'dct:description': '<p>Alle activiteiten in Amsterdam en omgeving...</p>',
            'dct:identifier': '642f15c7-8368-4795-9e3d-1a87fa7e562a',
            'dct:title': 'Activiteiten',
            '_links': {
                'self': {
                    'href': 'https://api.amsterdam.nl/dcatd/datasets/642f15c7-8368-4795-9e3d-1a87fa7e562a'
                }
            }
        });
    });
});
