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
            const categoryName = getCategoryName(category),
                title = getTitle(categoryName, numberOfResults),
                subTitle = getSubTitle(query, location);

            if (category) {
                return {
                    title: `${title} ${subTitle}`
                };
            } else {
                return {
                    title: title,
                    subTitle: title && subTitle
                };
            }
        }

        function getCategoryName (category) {
            let categoryName = null;

            if (category) {
                categoryName = SEARCH_CONFIG.QUERY_ENDPOINTS.filter(
                    endpoint => endpoint.slug === category)[0].label_plural;
            }

            return categoryName;
        }

        function getTitle (categoryName, numberOfResults) {
            let title = '';

            if (categoryName) {
                title = numberFilter(numberOfResults) + ' ' + lowercaseFilter(categoryName);
            } else if (numberOfResults === 0) {
                title = 'Geen resultaten gevonden';
            } else if (numberOfResults > 0) {
                title = `Data (${numberFilter(numberOfResults)})`;
            }

            return title;
        }

        function getSubTitle (query, location) {
            let subTitle = '';

            if (query) {
                subTitle = '"' + query + '"';
            } else if (location) {
                subTitle = 'locatie ' + coordinatesFilter(location, 'WGS84');
            }

            if (subTitle) {
                subTitle = 'met ' + subTitle;
            }

            return subTitle;
        }
    }
})();
