(function () {
    angular
        .module('dpCatalogus')
        .factory('catalogusApi', catalogusApiFactory);

    catalogusApiFactory.$inject = ['catalogusConfig', 'api'];

    function catalogusApiFactory (catalogusConfig, api) {
        return {
            query: query
        };

        function query (activeFilters, page) {
            let searchParams;

            searchParams = {
                start: (page - 1) * catalogusConfig.MAX_ITEMS_PER_PAGE,
                'facet.field': ['groups', 'res_format', 'organization'],
                fq: queryFilters(activeFilters)
            };

            return api.getByUrl(catalogusConfig.ENDPOINT_PREVIEW, searchParams).then(function (data) {
                if (data.success) {
                    return {
                        number_of_pages: Math.ceil(data.result.count / catalogusConfig.MAX_ITEMS_PER_PAGE),
                        number_of_records: data.result.count,
                        filters: formatFilters(data.result.search_facets),
                        data: formatData(data.result.results)
                    };
                }
            });
        }

        function queryFilters (filters) {
            let queryString = '';

            Object.keys(filters).forEach(key => {
                queryString += (queryString ? ' ' : '') + `${key}:${filters[key]}`;
            });

            return queryString;
        }

        function formatFilters (rawData) {
            const formattedFilters = angular.copy(catalogusConfig.FILTERS);

            return formattedFilters.filter(function (filter) {
                // Only show the filters that are returned by the API
                return angular.isObject(rawData[filter.slug]);
            }).map(function (filter) {
                // Add all the available options for each filter
                filter.options = rawData[filter.slug].items.map(function (option) {
                    return {
                        label: option.display_name,
                        count: option.count
                    };
                });

                // Note: filter.options is limited to 100 results
                filter.numberOfOptions = rawData[filter.slug].items.length;

                return filter;
            });
        }

        function formatData (rawData) {
            return {
                head: catalogusConfig.CONTENT.map(item => item.label),
                body: rawData.map(rawDataRow => {
                    return {
                        detailEndpoint: getDetailEndpoint(rawDataRow),
                        content: catalogusConfig.CONTENT.map(item => {
                            return item.variables.map(variable => {
                                return {
                                    key: variable,
                                    value: rawDataRow[variable]
                                };
                            });
                        })
                    };
                }),
                formatters: catalogusConfig.CONTENT.map(item => item.formatter)
            };
        }

        function getDetailEndpoint (rawDataRow) {
            return catalogusConfig.ENDPOINT_DETAIL +
                rawDataRow[catalogusConfig.PRIMARY_KEY] + '/';
        }
    }
})();
