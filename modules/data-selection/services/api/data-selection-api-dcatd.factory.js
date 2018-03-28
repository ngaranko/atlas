import {
    setDataSelectionDcatFilters
} from '../../../../src/data-selection/ducks/data-selection/data-selection-catalog';

(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApiDcatd', dataSelectionApiDcatdFactory);

    dataSelectionApiDcatdFactory.$inject = ['$window', '$q', '$filter', 'sharedConfig', 'api'];

    function dataSelectionApiDcatdFactory ($window, $q, $filter, sharedConfig, api) {
        const searchParamTheme = '/properties/dcat:theme/items',
            searchParamFormat = '/properties/dcat:distribution/items/properties/dct:format',
            searchParamOwner = '/properties/ams:owner';
        var catalogFilters;

        return {
            query: query,
            getFilters
        };

        function query (config, activeFilters, page, searchText) {
            const deferred = $q.defer(),
                searchParams = {
                    offset: (page - 1) * config.MAX_ITEMS_PER_PAGE,
                    limit: config.MAX_ITEMS_PER_PAGE
                },
                queryTheme = getQueryTheme(activeFilters),
                queryFormat = getQueryFormat(activeFilters),
                queryOwner = getQueryOwner(activeFilters);

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

            if (queryOwner !== '') {
                // optional owner filter
                searchParams[searchParamOwner] = queryOwner;
            }

            $q.all([getFilters(config)]).then(() => {
                api.getByUri(config.ENDPOINT_PREVIEW, searchParams).then(data => {
                    // deferred.resolve({success: true});
                    // return;
                    const count = data['dcat:dataset'].length;
                    if (count !== 0) {
                        const results = data['dcat:dataset'];
                        deferred.resolve({
                            numberOfPages: Math.ceil(count / config.MAX_ITEMS_PER_PAGE),
                            numberOfRecords: count,
                            filters: formatFilters(results, config),
                            data: formatData(config, results)
                        });
                    } else {
                        deferred.reject();
                    }
                }, deferred.reject);
            });

            return deferred.promise;
        }

        function getFilters (config) {
            const deferred = $q.defer();
            if (angular.isDefined(catalogFilters)) {
                deferred.resolve();
            } else {
                api.getByUri(config.ENDPOINT_METADATA).then(data => {
                    console.log('call config.ENDPOINT_METADATA', data);
                    // deferred.resolve({
                    //     groupTypes: [],
                    //     formatTypes: [],
                    //     ownerTypes: [],
                    //     licenseTypes: []
                        
                    // });
                    // return;
                    const dcatDocProperties = data.components.schemas['dcat-doc'].properties,
                        themaProperties = dcatDocProperties['dcat:theme'].items,
                        distributionProperties = dcatDocProperties['dcat:distribution'].items.properties,
                        ownerProperties = dcatDocProperties['ams:owner'].examples;

                    catalogFilters = {
                        groupTypes: getOptions(themaProperties),
                        formatTypes: getOptions(distributionProperties['dct:format']),
                        serviceTypes: getOptions(distributionProperties['ams:serviceType']),
                        resourceTypes: getOptions(distributionProperties['ams:resourceType']),
                        ownerTypes: ownerProperties.map(item => {
                            return {
                                id: item,
                                label: item
                            };
                        }),
                        licenseTypes: getOptions(dcatDocProperties['ams:license'])
                    };
                    $window.reduxStore.dispatch(setDataSelectionDcatFilters(catalogFilters));

                    deferred.resolve();
                });
            }

            return deferred.promise;
        }

        function getOptions (propertyType) {
            var options = [];
            for (var i = 0; i < propertyType.enum.length; ++i) {
                const index = propertyType.enum[i].indexOf(':');
                options.push({
                    id: index === -1 ? propertyType.enum[i] : propertyType.enum[i].substring(index + 1),
                    label: propertyType.enumNames[i]
                });
            }
            return options;
        }

        function getQueryTheme (filters) {
            return Object.keys(filters).reduce((queryString, key) => {
                if (key !== 'groups') return queryString;
                return queryString + `eq=theme:${filters[key]}`;
            }, '');
        }

        function getQueryFormat (filters) {
            return Object.keys(filters).reduce((queryString, key) => {
                if (key !== 'data_format') return queryString;
                return queryString + `eq=${filters[key]}`;
            }, '');
        }

        function getQueryOwner (filters) {
            return Object.keys(filters).reduce((queryString, key) => {
                if (key !== 'owner') return queryString;
                return queryString + `eq=${filters[key]}`;
            }, '');
        }

        function formatFilters (searchParams, filtersConfig) {
            // return Object.keys(rawData).reduce((filters, key) => {
            //     const items = rawData[key].items;
            //     const filterConfig = filtersConfig.find(config => config.slug === key);
            //     if (filterConfig && filterConfig.formatter) {
            //         items.forEach(item => item.display_name = $filter(filterConfig.formatter)(item.display_name));
            //     }
            //     items.sort((a, b) => a.display_name.localeCompare(b.display_name));
            //     filters[key] = {
            //         numberOfOptions: rawData[key].items.length,
            //         options: items.map(option => {
            //             return {
            //                 id: option.name,
            //                 label: option.display_name,
            //                 count: option.count
            //             };
            //         })
            //     };
            //     return filters;
            // }, {});

            var filters = {};

            filters.groups = {
                numberOfOptions: catalogFilters.groupTypes.length,
                options: catalogFilters.groupTypes.map(option => {
                    return {
                        id: option.id,
                        label: option.label,
                        count: 1
                    };
                })
            };

            filters.data_format = {
                numberOfOptions: catalogFilters.formatTypes.length,
                options: catalogFilters.formatTypes.map(option => {
                    return {
                        id: option.id,
                        label: option.label,
                        count: 1
                    };
                })
            };

            filters.service_type = {
                numberOfOptions: catalogFilters.serviceTypes.length,
                options: catalogFilters.serviceTypes.map(option => {
                    return {
                        id: option.id,
                        label: option.label,
                        count: 1
                    };
                })
            };

            filters.resource_type = {
                numberOfOptions: catalogFilters.resourceTypes.length,
                options: catalogFilters.resourceTypes.map(option => {
                    return {
                        id: option.id,
                        label: option.label,
                        count: 1
                    };
                })
            };

            filters.owner = {
                numberOfOptions: catalogFilters.ownerTypes.length,
                options: catalogFilters.ownerTypes.map(option => {
                    return {
                        id: option.id,
                        label: option.label,
                        count: 1
                    };
                })
            };

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
