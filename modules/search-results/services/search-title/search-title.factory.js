(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .factory('searchTitle', searchTitleFactory);
    searchTitleFactory.$inject = ['SEARCH_CONFIG', 'numberFilter', 'coordinatesFilter'];

    function searchTitleFactory (SEARCH_CONFIG, numberFilter, coordinatesFilter) {
        return {
            getTitleData: getTitleData
        };

        function getTitleData (numberOfResults, query, location, category) {
            const categoryName = getCategoryName(category, query, location),
                title = getTitle(categoryName, numberOfResults),
                subTitle = getSubTitle(query, location);

            return {
                title: title,
                subTitle: title && subTitle
            };
        }

        /**
         * Retrieves the name of the category based on the categorySlug
         * provided.
         *
         * When searched by query the name will be retrieved from the
         * QUERY_ENDPOINTS. When searched by location the name will be
         * retrieved from the COORDINATES_HIERARCHY.
         *
         * @param {string} categorySlug The slug of the category to get the
         * name for.
         * @param {string} query Truthy when seached by query.
         * @param {number[]} location Truthy when searched by location.
         * @return {?string} The name of the category or null.
         */
        function getCategoryName (categorySlug, query, location) {
            const config = query
                ? SEARCH_CONFIG.QUERY_ENDPOINTS
                : SEARCH_CONFIG.COORDINATES_HIERARCHY;
            const categories = categorySlug
                ? config.filter(endpoint => endpoint.slug === categorySlug)
                : null;

            return categories && categories.length
                ? categories[0].label_plural
                : null;
        }

        function getTitle (categoryName, numberOfResults) {
            let title = '';

            if (categoryName) {
                title = categoryName;
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
                subTitle = `'${query}'`;
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
