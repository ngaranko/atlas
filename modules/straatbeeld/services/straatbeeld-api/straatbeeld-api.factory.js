(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['$q', 'straatbeeldConfig', 'geojson', 'api'];

    function straatbeeldApiFactory ($q, straatbeeldConfig, geojson, api) {
        const MAX_RADIUS = 10000;   // The maximum distance from a location to search for a straatbeeld
        const START_RADIUS = 100;   // The distance to start searching for a straatbeeld

        let cancel; // Promise to cancel any outstanding http requests

        return {
            getImageDataByLocation,
            getImageDataById
        };

        function getImageDataByLocation (location) {
            let result = $q.defer();

            searchWithinRadius(location, START_RADIUS, result);

            return result.promise;
        }

        /**
         * Search for a straatbeeld
         * @param {number[]} location the center location
         * @param {number} radius the distance from the location within to search for a straatbeeld
         * @param {Promise} resultPromise the promise to resolve on found straatbeeld or reject on failure
         */
        function searchWithinRadius (location, radius, resultPromise) {
            radius = Math.min(radius, MAX_RADIUS);
            getStraatbeeld(straatbeeldConfig.STRAATBEELD_ENDPOINT +
                `?lat=${location[0]}&lon=${location[1]}&radius=${radius}`)
                .then(
                    data => {
                        if (data) {
                            resultPromise.resolve(data);
                        } else if (radius < MAX_RADIUS) {
                            searchWithinRadius(location, radius * 2, resultPromise);
                        } else {
                            resultPromise.reject();
                        }
                    }
                );
        }

        function getImageDataById (id) {
            return getStraatbeeld(straatbeeldConfig.STRAATBEELD_ENDPOINT + id + '/');
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
