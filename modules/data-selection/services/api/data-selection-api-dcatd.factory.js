(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApiDcatd', dataSelectionApiDcatdFactory);

    dataSelectionApiDcatdFactory.$inject = ['$q', '$filter', 'sharedConfig', 'api'];

    function dataSelectionApiDcatdFactory ($q, $filter, sharedConfig, api) {
        return {
            query: query
        };

        function query (config, activeFilters, page, searchText) {
            const deferred = $q.defer(),
                searchParams = {
                    offset: (page - 1) * config.MAX_ITEMS_PER_PAGE,
                    limit: config.MAX_ITEMS_PER_PAGE
                },
                queryTheme = getQueryTheme(activeFilters),
                queryFormat = getQueryFormat(activeFilters),
                searchParamTheme = '/properties/dcat:theme/items',
                searchParamFormat = '/properties/dcat:distribution/items/properties/dct:format';

            if (searchText) {
                // Optional search text
                searchParams.q = searchText;
            }

            if (queryTheme !== '') {
                // optional thema/groups filter
                searchParams[searchParamTheme] = queryTheme;
            }

            if (queryFormat !== '') {
                // optional format filter
                searchParams[searchParamFormat] = queryFormat;
            }

            api.getByUri(config.ENDPOINT_PREVIEW, searchParams).then(data => {
                const count = data['dcat:dataset'].length;
                if (count !== 0) {
                    const results = data['dcat:dataset'];
                    deferred.resolve({
                        numberOfPages: Math.ceil(count / config.MAX_ITEMS_PER_PAGE),
                        numberOfRecords: count,
                        filters: formatFilters(searchParams),
                        data: formatData(config, results)
                    });
                } else {
                    deferred.reject();
                }
            }, deferred.reject);

            return deferred.promise;
        }

        function getQueryTheme (filters) {
            return Object.keys(filters).reduce((queryString, key) => {
                if (key !== 'groups') return queryString;
                return queryString + (queryString ? ' ' : '') + `eq=theme:${filters[key]}`;
            }, '');
        }

        function getQueryFormat (filters) {
            return Object.keys(filters).reduce((queryString, key) => {
                if (key !== 'data_format') return queryString;
                return queryString + (queryString ? ' ' : '') + `eq=${filters[key]}`;
            }, '');
        }

        function formatFilters (searchParams) {
            const searchParamTheme = '/properties/dcat:theme/items',
                searchParamFormat = '/properties/dcat:distribution/items/properties/dct:format';
            var filters = {};
            if (angular.isUndefined(searchParams[searchParamTheme])) {
                filters.groups = {
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
                };
            }
            if (angular.isUndefined(searchParams[searchParamFormat])) {
                filters.data_format = {
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
                };
            }
            return Object.keys(filters).reduce((filterString, key) => {
                return filters;
            }, {});
        }

        function formatData (config, rawData) {
            return rawData.map(rawDataRow => {
                rawDataRow._links = {
                    self: {
                        href: getDetailEndpoint(config, rawDataRow)
                    }
                };
                return rawDataRow;
            });
        }

        function getDetailEndpoint (config, rawDataRow) {
            return sharedConfig.API_ROOT + config.ENDPOINT_DETAIL +
                '/' + rawDataRow[config.PRIMARY_KEY];
        }
    }
})();
