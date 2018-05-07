(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApiDcatd', dataSelectionApiDcatdFactory);

    dataSelectionApiDcatdFactory.$inject = ['$window', '$q', '$filter', 'sharedConfig', 'api'];

    function dataSelectionApiDcatdFactory ($window, $q, $filter, sharedConfig, api) {
        const propertyName = {
            theme: '/properties/dcat:theme/items',
            format: '/properties/dcat:distribution/items/properties/dct:format',
            owner: '/properties/ams:owner',
            distributionType: '/properties/dcat:distribution/items/properties/ams:distributionType',
            serviceType: '/properties/dcat:distribution/items/properties/ams:serviceType'
        };

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
                searchParams[propertyName.theme] = queryTheme;
            }

            if (queryFormat) {
                // optional format filter
                searchParams[propertyName.format] = queryFormat;
            }

            if (queryOwner) {
                // optional owner filter
                searchParams[propertyName.owner] = queryOwner;
            }

            if (queryDistributionType) {
                // optional distribution type filter
                searchParams[propertyName.distributionType] = queryDistributionType;
            }

            if (queryServiceType) {
                // optional service type filter
                searchParams[propertyName.serviceType] = queryServiceType;
            }

            api.getByUri(config.ENDPOINT_PREVIEW, searchParams).then(data => {
                const count = data['void:documents'];
                if (count) {
                    const results = data['dcat:dataset'];
                    deferred.resolve({
                        numberOfPages: Math.ceil(count / config.MAX_ITEMS_PER_PAGE),
                        numberOfRecords: count,
                        filters: !Object.keys(catalogFilters).length ? {} :
                          formatFilters(data['ams:facet_info'], catalogFilters),
                        data: formatData(config, results)
                    });
                } else {
                    deferred.reject();
                }
            }, deferred.reject);

            return deferred.promise;
        }

        function getFacetOptions (facet, filterCatalog, namespace) {
            return Object.keys(facet).map(option => {
                const id = namespace ? option.replace(`${namespace}:`, '') : option;
                const catalogOption = filterCatalog.filter(item => item.id === id)[0];
                return {
                    id: id,
                    label: catalogOption ? catalogOption.label : '${option} niet gevonden',
                    count: facet[option]
                };
            });
        }

        function formatFilters (filters, catalogFilters) {
            filters[propertyName.owner] = filters[propertyName.owner] || {};
            const resultFilters = {
                groups: {
                    numberOfOptions: Object.keys(filters[propertyName.theme]).length,
                    options: getFacetOptions(filters[propertyName.theme], catalogFilters.groupTypes, 'theme')
                },
                formats: {
                    numberOfOptions: Object.keys(filters[propertyName.format]).length,
                    options: getFacetOptions(filters[propertyName.format], catalogFilters.formatTypes)
                },
                owners: {
                    numberOfOptions: Object.keys(filters[propertyName.owner]).length,
                    options: getFacetOptions(filters[propertyName.owner], catalogFilters.ownerTypes)
                },
                distributionTypes: {
                    numberOfOptions: Object.keys(filters[propertyName.distributionType]).length,
                    options: getFacetOptions(filters[propertyName.distributionType], catalogFilters.distributionTypes)
                },
                serviceTypes: {
                    numberOfOptions: Object.keys(filters[propertyName.serviceType]).length,
                    options: getFacetOptions(filters[propertyName.serviceType], catalogFilters.serviceTypes)
                }
            };

            return Object.keys(resultFilters)
                .filter((key) => resultFilters[key].numberOfOptions > 0)
                .reduce((result, key) => ({
                    ...result,
                    [key]: resultFilters[key]
                }), {});
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
