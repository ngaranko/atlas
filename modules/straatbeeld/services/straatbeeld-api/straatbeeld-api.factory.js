(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['$q', 'STRAATBEELD_CONFIG', 'sharedConfig', 'geojson', 'api'];

    function straatbeeldApiFactory ($q, STRAATBEELD_CONFIG, sharedConfig, geojson, api) {
        const MAX_RADIUS = 10000;   // The maximum distance from a location to search for a straatbeeld
        const START_RADIUS = 1000;  // The distance to start searching for a straatbeeld

        let cancel; // Promise to cancel any outstanding http requests

        return {
            getImageDataByLocation,
            getImageDataById
        };

        /**
         * @param {Number[]} location the center location
         * @returns {Promise.imageData} a Promise that resolves to the found straatbeeld or null on failure
         */
        function getImageDataByLocation (location) {
            return searchWithinRadius(location, START_RADIUS);
        }

        /**
         * Search for a straatbeeld
         * @param {Number[]} location the center location
         * @param {Number} radius the distance from the location within to search for a straatbeeld
         * @returns {Promise.imageData} a Promise that resolves to the found straatbeeld or null on failure
         */
        function searchWithinRadius (location, radius) {
            let cappedRadius = Math.min(radius, MAX_RADIUS);

            return getStraatbeeld(sharedConfig.API_ROOT + STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT +
                `?lat=${location[0]}&lon=${location[1]}&radius=${cappedRadius}`)
                .then(
                    data => {
                        if (data) {
                            return data;
                        } else if (radius < MAX_RADIUS) {
                            return searchWithinRadius(location, cappedRadius * 2);
                        } else {
                            return null;
                        }
                    }
                );
        }

        function getImageDataById (id) {
            return getStraatbeeld(sharedConfig.API_ROOT + STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT + id + '/');
        }

        function getStraatbeeld (url) {
            if (cancel) {
                // Cancel any outstanding requests
                cancel.resolve();
            }
            cancel = $q.defer();
            return api.getByUrl(url, undefined, cancel)
                .then(imageData)
                .finally(() => cancel = null);
        }

        function imageData (response) {
            if (angular.isObject(response.geometrie)) {
                let formattedGeometrie = {
                    coordinates: [
                        response.geometrie.coordinates[1],
                        response.geometrie.coordinates[0]
                    ],
                    type: response.geometrie.type
                };

                return {
                    date: new Date(response.timestamp),
                    id: response.pano_id,
                    hotspots: response.adjacent.map(function (item) {
                        return {
                            id: item.pano_id,
                            heading: item.heading,
                            distance: item.distance
                        };
                    }),
                    location: geojson.getCenter(formattedGeometrie),
                    image: response.image_sets.cubic
                };
            }
        }
    }
})();
