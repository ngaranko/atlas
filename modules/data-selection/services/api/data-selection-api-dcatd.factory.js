(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApiDcatd', dataSelectionApiDcatdFactory);

    dataSelectionApiDcatdFactory.$inject = ['$window', '$q', '$filter', 'sharedConfig', 'api'];

    function dataSelectionApiDcatdFactory ($window, $q, $filter, sharedConfig, api) {
        const searchParamTheme = '/properties/dcat:theme/items',
            searchParamFormat = '/properties/dcat:distribution/items/properties/dct:format',
            searchParamOwner = '/properties/ams:owner',
            searchParamDistributionType = '/properties/dcat:distribution/items/properties/ams:distributionType',
            searchParamServiceType = '/properties/dcat:distribution/items/properties/ams:serviceType';

        return {
            query: query
        };

        function query (config, activeFilters, page, searchText = '', geometryFilter = undefined, catalogFilters = {}) {
            const deferred = $q.defer(),
                searchParams = {
                    offset: (page - 1) * config.MAX_ITEMS_PER_PAGE,
                    limit: config.MAX_ITEMS_PER_PAGE
                },
                queryTheme = activeFilters.groups && `eq=theme:${activeFilters.groups}`,
                queryFormat = activeFilters.formats && `eq=${activeFilters.formats}`,
                queryOwner = activeFilters.owners && `eq=${activeFilters.owners}`,
                queryDistributionType = activeFilters.distributionTypes && `eq=${activeFilters.distributionTypes}`,
                queryServiceType = activeFilters.serviceTypes && `eq=${activeFilters.serviceTypes}`;

            if (searchText) {
                // Optional search text
                searchParams.q = searchText;
            }

            if (queryTheme) {
                // optional thema/groups filter
                searchParams[searchParamTheme] = queryTheme;
            }

            if (queryFormat) {
                // optional format filter
                searchParams[searchParamFormat] = queryFormat;
            }

            if (queryOwner) {
                // optional owner filter
                searchParams[searchParamOwner] = queryOwner;
            }

            if (queryDistributionType) {
                // optional distribution type filter
                searchParams[searchParamDistributionType] = queryDistributionType;
            }

            if (queryServiceType) {
                // optional service type filter
                searchParams[searchParamServiceType] = queryServiceType;
            }

            if (!Object.keys(catalogFilters).length) {
                deferred.reject();
            } else {
                api.getByUri(config.ENDPOINT_PREVIEW, searchParams).then(data => {
                    const count = data['dcat:dataset'].length;
                    if (count) {
                        const results = data['dcat:dataset'];
                        deferred.resolve({
                            numberOfPages: Math.ceil(count / config.MAX_ITEMS_PER_PAGE),
                            numberOfRecords: count,
                            filters: formatFilters(config, catalogFilters),
                            data: formatData(config, results)
                        });
                    } else {
                        deferred.reject();
                    }
                }, deferred.reject);
            }
            return deferred.promise;
        }

        function formatFilters (filtersConfig, catalogFilters) {
            return {
                groups: {
                    numberOfOptions: catalogFilters.groupTypes.length,
                    options: catalogFilters.groupTypes.map(option => {
                        return {
                            id: option.id,
                            label: option.label,
                            count: 1
                        };
                    })
                },
                formats: {
                    numberOfOptions: catalogFilters.formatTypes.length,
                    options: catalogFilters.formatTypes.map(option => {
                        return {
                            id: option.id,
                            label: option.label,
                            count: 1
                        };
                    })
                },
                owners: {
                    numberOfOptions: catalogFilters.ownerTypes.length,
                    options: catalogFilters.ownerTypes.map(option => {
                        return {
                            id: option.id,
                            label: option.label,
                            count: 1
                        };
                    })
                },
                distributionTypes: {
                    numberOfOptions: catalogFilters.distributionTypes.length,
                    options: catalogFilters.distributionTypes.map(option => {
                        return {
                            id: option.id,
                            label: option.label,
                            count: 1
                        };
                    })
                },
                serviceTypes: {
                    numberOfOptions: catalogFilters.serviceTypes.length,
                    options: catalogFilters.serviceTypes.map(option => {
                        return {
                            id: option.id,
                            label: option.label,
                            count: 1
                        };
                    })
                }
            };
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
            return `${sharedConfig.API_ROOT}${config.ENDPOINT_DETAIL}/${rawDataRow[config.PRIMARY_KEY]}`;
        }
    }
})();
