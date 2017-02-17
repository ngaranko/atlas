(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .factory('search', searchFactory);

    searchFactory.$inject = ['$q', 'SEARCH_CONFIG', 'api', 'searchFormatter', 'TabHeader'];

    function searchFactory ($q, SEARCH_CONFIG, api, searchFormatter, TabHeader) {
        return {
            search,
            loadMore,
            initialize
        };

        function initialize () {
            TabHeader.provideCounter('FETCH_SEARCH_RESULTS_BY_QUERY', payload => searchCount(payload));
        }

        function searchCount (payload) {
            return search(payload).then(results => results.reduce((count, current) => count + current.count, 0));
        }

        function search (query, categorySlug) {
            var queries = [],
                params = {
                    q: query
                };

            SEARCH_CONFIG.QUERY_ENDPOINTS.forEach(function (endpoint) {
                if ((!angular.isString(categorySlug) || categorySlug === endpoint.slug) &&
                        endpoint.uri) {
                    queries.push(
                        api.getByUri(endpoint.uri, params).then(data => data, () => [])
                    );
                }
            });

            if (angular.isString(categorySlug)) {
                // A single category
                return $q.all(queries).then(function (searchResults) {
                    return [searchFormatter.formatCategory(categorySlug, searchResults[0])];
                });
            } else {
                // All search results
                return $q.all(queries).then(searchFormatter.formatCategories);
            }
        }

        function loadMore (category) {
            return api.getByUrl(category.next)
                .then(function (nextPageData) {
                    // Don't change the input, create a new variable
                    var output = {};

                    output.slug = category.slug;
                    output.count = nextPageData.count;
                    output.results = category.results.concat(
                        searchFormatter.formatLinks(category.slug, nextPageData.results)
                    );

                    if (output.count > output.results.length) {
                        output.next = nextPageData._links.next.href;
                    } else {
                        output.next = null;
                    }

                    return output;
                });
        }
    }
})();
