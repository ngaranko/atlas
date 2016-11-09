(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['straatbeeldConfig', 'geojson', 'api'];

    function straatbeeldApiFactory (straatbeeldConfig, geojson, api) {
        return {
            getImageDataByLocation,
            getImageDataById
        };

        function getImageDataByLocation (location) {
            const MAX_RADIUS = 10000;
            return api.getByUrl(straatbeeldConfig.STRAATBEELD_ENDPOINT +
                `?lat=${location[0]}&lon=${location[1]}&radius=${MAX_RADIUS}`)
                .then(imageData);
        }

        function getImageDataById (id) {
            return api.getByUrl(straatbeeldConfig.STRAATBEELD_ENDPOINT + id + '/')
                .then(imageData);
        }

        function imageData (response) {
            var formattedGeometrie = {
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
})();
