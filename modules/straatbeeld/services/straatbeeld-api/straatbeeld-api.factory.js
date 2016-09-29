(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['straatbeeldConfig', 'sharedConfig', 'geojson', 'api'];

    function straatbeeldApiFactory (straatbeeldConfig, sharedConfig, geojson, api) {
        return {
            getImageDataById: getImageDataById
        };

        function getImageDataById (id) {
            return api.getByUrl(straatbeeldConfig.PANORAMA_ENDPOINT + id + '/', 
                { radius: sharedConfig.RADIUS }
            ).then(function (response) {
                return {
                    date: new Date(response.timestamp),
                    hotspots: response.adjacent.map(function(item){
                        return {
                            id: item.pano_id,
                            heading: item.heading,
                            distance: item.distance
                        };
                    }),
                    location: geojson.getCenter(response.geometrie),
                    image: response.images.equirectangular
                };
            });
        }
    } 
})(); 


