(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .factory('searchTitle', searchTitleFactory);
    searchTitleFactory.$inject = ['SEARCH_CONFIG', 'numberFilter', 'lowercaseFilter', 'coordinatesFilter'];

    function searchTitleFactory (SEARCH_CONFIG, numberFilter, lowercaseFilter, coordinatesFilter) {
        return {
            getTitleData: getTitleData
        };

        function getTitleData (numberOfResults, query, location, category) {
            const categoryName = category
                    ? SEARCH_CONFIG.QUERY_ENDPOINTS.filter(endpoint => endpoint.slug === category)
                        [0].label_plural : null;

            var title = '',
                subTitle = '';

            if (categoryName) {
                title = numberFilter(numberOfResults) + ' ' + lowercaseFilter(categoryName);
            } else if (numberOfResults === 0) {
                title = 'Geen resultaten gevonden';
            } else if (numberOfResults === 1) {
                title = '1 resultaat';
            } else if (numberOfResults > 1) {
                title = numberFilter(numberOfResults) + ' resultaten';
            }

            if (query) {
                subTitle += ' "' + query + '"';
            } else if (location) {
                subTitle += ' locatie ' + coordinatesFilter(location);
            }

            if (subTitle) {
                subTitle = 'met ' + subTitle;
            }

            return {
                title: title,
                subTitle: subTitle
            };
        }
    }
})();
