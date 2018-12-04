(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['$q', 'STRAATBEELD_CONFIG', 'sharedConfig', 'geojson', 'api'];

    function straatbeeldApiFactory ($q, STRAATBEELD_CONFIG, sharedConfig, geojson, api) {
        const MAX_RADIUS_KM = 100; // The maximum search radius straatbeeld in KM

        let cancel; // Promise to cancel any outstanding http requests

        return {
            getImageDataByLocation,
            getImageDataById
        };

        /**
         * @param {Number[]} location The center location.
         * @param {Number} history The year to featch hotspots for, queries all
         *   years when falsy.
         * @returns {Promise.imageData} The fetched straatbeeld, or null on failure.
         */
        function getImageDataByLocation (location, history) {
            return searchWithinRadius(location, MAX_RADIUS_KM * 1000, history);
        }

        /**
         * Search for a straatbeeld.
         *
         * @param {Number[]} location The center location.
         * @param {Number} radius The distance from the location within to
         *   search for a straatbeeld.
         * @param {Number} history The year to featch hotspots for, queries all
         *   years when falsy.
         *
         * @returns {Promise.imageData} The fetched straatbeeld, or null on failure.
         */
        function searchWithinRadius (location, radius, history) {
            const endpoint = history
                ? `${STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_YEAR}${history}/`
                : STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_ALL;

            return getStraatbeeld(`${sharedConfig.API_ROOT}${endpoint}` +
                `?lat=${location[0]}&lon=${location[1]}&radius=${radius}`)
                .then(
                    data => {
                        if (data) {
                            return data;
                        } else {
                            return null;
                        }
                    }
                );
        }

        function getImageDataById (id, history) {
            const prefix = STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_PREFIX;
            const suffix = STRAATBEELD_CONFIG.STRAATBEELD_ENDPOINT_SUFFIX;

            const yearRange = (history) ? `timestamp_before=${history}-12-31&timestamp_after=${history}-01-01`
              : 'newest_in_range=true';
            const radius = `radius=${STRAATBEELD_CONFIG.MAX_RADIUS}`;

            return getStraatbeeld(`${sharedConfig.API_ROOT}${prefix}/${id}/${suffix}?${yearRange}&${radius}`);
        }

        function getStraatbeeld (url) {
            if (cancel) {
                // Cancel any outstanding requests
                cancel.resolve();
            }
            // cancel = $q.defer();
            return api.getByUrl(url, undefined, cancel)
                .then((json) => json._embedded)
                .then(imageData)
                .finally(() => cancel = null);
        }

        function imageData (response) {
            const panorama = response && response.adjacencies[0];
            const adjacencies = response && response.adjacencies.filter((adjacency) => adjacency !== panorama);

            if (panorama && angular.isObject(panorama.geometry)) {
                const formattedGeometry = {
                    coordinates: [
                        panorama.geometry.coordinates[1],
                        panorama.geometry.coordinates[0]
                    ],
                    type: panorama.geometry.type
                };

                return {
                    date: new Date(panorama.timestamp),
                    id: panorama.pano_id,
                    hotspots: adjacencies.map(function (adjacency) {
                        return {
                            id: adjacency.pano_id,
                            heading: adjacency.direction,
                            distance: adjacency.distance,
                            year: adjacency.timestamp.substring(1, 4)
                        };
                    }),
                    location: geojson.getCenter(formattedGeometry),
                    image: {
                        baseurl: panorama.cubic_img_baseurl,
                        pattern: panorama.cubic_img_pattern,
                        preview: panorama.cubic_img_baseurl
                    }
                };
            }
        }
    }
})();
