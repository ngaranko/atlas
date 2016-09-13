(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApi', dataSelectionApiFactory);

    dataSelectionApiFactory.$inject = ['dpDataSelectionConfig', 'api'];

    function dataSelectionApiFactory (dpDataSelectionConfig, api) {
        return {
            query: query
        };

        function query (dataset, activeFilters, page) {
            var searchParams = angular.merge(
                {
                    page: page
                },
                activeFilters
            );

            return api.getByUrl(dpDataSelectionConfig[dataset].ENDPOINT, searchParams).then(function (data) {
                return {
                    number_of_pages: data.page_count,
                    filters: formatFilters(dataset, data.aggs_list),
                    tableData: formatTableData(dataset, data.object_list)
                };
            });
        }

        function formatFilters (dataset, rawData) {
            var formattedFilters = angular.copy(dpDataSelectionConfig[dataset].FILTERS);

            return formattedFilters.filter(function (filter) {
                //Only show the filters that are returned by the API
                return angular.isObject(rawData[filter.slug]);
            }).map(function (filter) {
                //Add all the available options for each filter
                filter.options = rawData[filter.slug].buckets.map(function (option) {
                    return {
                        label: option.key,
                        count: option.doc_count
                    };
                });

                //Note: filter.options is limited to 100 results
                filter.numberOfOptions = rawData[filter.slug].doc_count;

                return filter;
            });
        }

        function formatTableData (dataset, rawData) {
            var tableHead,
                tableBody = [];

            tableHead = dpDataSelectionConfig[dataset].FIELDS.map(function (field) {
                return field.label;
            });

            tableBody = rawData.map(function (rawDataRow) {
                var detailEndpoint;

                detailEndpoint = dpDataSelectionConfig[dataset].ENDPOINT_DETAIL;
                detailEndpoint += rawDataRow[dpDataSelectionConfig[dataset].PRIMARY_KEY];
                detailEndpoint += '/';

                return {
                    detailEndpoint: detailEndpoint,
                    fields: dpDataSelectionConfig[dataset].FIELDS.map(function (field) {
                        return rawDataRow[field.slug];
                    })
                };
            });

            return {
                head: tableHead,
                body: tableBody
            };
        }
    }
})();
