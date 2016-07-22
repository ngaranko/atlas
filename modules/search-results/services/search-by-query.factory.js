(function () {
    'use strict';

    angular
        .module('atlasSearchResults')
        .factory('searchByQuery', searchByQueryFactory);

    searchByQueryFactory.$inject = ['$q', 'SEARCH_CONFIG', 'api'];

    function searchByQueryFactory ($q, SEARCH_CONFIG, api) {
        return {
            searchAll: searchAll,
            searchCategory: searchCategory
        };

        function searchAll (query) {
            var queries = [];

            SEARCH_CONFIG.QUERY_ENDPOINTS.forEach(function (endpoint) {
                var params = {
                    q: query,
                    page: 1
                };

                queries.push(
                    api.getByUri(endpoint.uri, params)
                );
            });

            //When all queries are resolved
            return $q.all(queries).then(formatResults);
        }

        function searchCategory (endpoint, params) {
            return api.getByUri(endpoint, params).then(formatResults);
        }

        function formatResults (allSearchResults) {
            return allSearchResults
                .map(function (endpointSearchResults, index) {
                    var links,
                        formattedLinks;

                    links = angular.isObject(endpointSearchResults) && endpointSearchResults.results || [];

                    formattedLinks = links.map(function (item) {
                        return {
                            label: item._display,
                            endpoint: item._links.self.href,
                            subtype: item.subtype
                        };
                    });

                    return {
                        label: SEARCH_CONFIG.QUERY_ENDPOINTS[index].label_plural,
                        slug: SEARCH_CONFIG.QUERY_ENDPOINTS[index].slug,
                        count: angular.isObject(endpointSearchResults) && endpointSearchResults.count || 0,
                        results: formattedLinks
                    };
                })
                //Remove 'empty' categories with no search results
                .filter(function (endpointSearchResults) {
                    return endpointSearchResults.count;
                });
        }
    }
})();
