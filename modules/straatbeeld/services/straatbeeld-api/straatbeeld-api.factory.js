(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['straatbeeldConfig', 'geojson', 'api'];

    function straatbeeldApiFactory (straatbeeldConfig, geojson, api) {
        return {
            getImageDataById: getImageDataById
        };

        function getImageDataById (id) {
            return api.getByUrl(straatbeeldConfig.STRAATBEELD_ENDPOINT + id + '/').then(function (response) {
                return {
                    date: new Date(response.timestamp),
                    hotspots: response.adjacent.map(function (item) {
                        return {
                            id: item.pano_id,
                            heading: item.heading,
                            distance: item.distance
                        };
                    }),
                    location: geojson.getCenter(response.geometrie),
                    image: response.images.cubic
                    /*
                    image: 'https://acc.atlas.amsterdam.nl/panorama/2016/04/18/TMX7315120208-000030/pano_0000_001797_' +
                        'cubic/'
                    */
                };
            });
        }
    }
})();
