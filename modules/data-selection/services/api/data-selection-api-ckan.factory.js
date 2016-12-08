(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApiCkan', dataSelectionApiCkanFactory);

    dataSelectionApiCkanFactory.$inject = ['api'];

    function dataSelectionApiCkanFactory (api) {
        return {
            query: query
        };

        function query (config, activeFilters, page) {
            let searchParams;

            searchParams = {
                start: (page - 1) * config.MAX_ITEMS_PER_PAGE,
                'facet.field': queryFilters(config.FILTERS),
                fq: queryActiveFilters(activeFilters)
            };

            return api.getByUri(config.ENDPOINT_PREVIEW, searchParams).then(function (data) {
                if (data.success) {
                    return {
                        numberOfPages: Math.ceil(data.result.count / config.MAX_ITEMS_PER_PAGE),
                        numberOfRecords: data.result.count,
                        filters: formatFilters(data.result.search_facets),
                        data: formatData(config, data.result.results)
                    };
                }
            });
        }

        function queryFilters (filters) {
            const queryString = filters.map(filter => {
                return `"${filter.slug}"`;
            }).join(',');
            return `[${queryString}]`;
        }

        function queryActiveFilters (filters) {
            let queryString = '';

            Object.keys(filters).forEach(key => {
                queryString += (queryString ? ' ' : '') + `${key}:${filters[key]}`;
            });

            return queryString;
        }

        function formatFilters (rawData) {
            const filters = {};

            Object.keys(rawData).forEach(key => {
                filters[key] = {
                    numberOfOptions: rawData[key].items.length,
                    options: rawData[key].items.map(option => {
                        return {
                            id: option.name,
                            label: option.display_name,
                            count: option.count
                        };
                    })
                };
            });

            return filters;
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
            return config.ENDPOINT_DETAIL +
                rawDataRow[config.PRIMARY_KEY] + '/';
        }
    }
})();
