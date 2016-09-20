(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('straatbeeldApi', straatbeeldApiFactory);

    straatbeeldApiFactory.$inject = ['$http', 'straatbeeldConfig', 'sharedConfig', 'geojson'];

    function straatbeeldApiFactory ($http, straatbeeldConfig, sharedConfig, geojson) {
        return {
            getImageDataById: getImageDataById
        };

        function getImageDataById (id) {
            return $http.get(straatbeeldConfig.PANORAMA_ENDPOINT + id + '/', {
                params:  {
                    radius: sharedConfig.RADIUS
                }
            }).then(function (response) {

                return {
                    date: new Date(response.data.timestamp),
                    hotspots: response.data.adjacent.map(function(item){
                        return {
                            panoId: item.pano_id,
                            heading: item.heading,
                            distance: item.distance
                        };
                    }),
                    location: geojson.getCenter(response.data.geometrie),
                    image: response.data.images.equirectangular
                };
            });
        }
    } 
})(); 
