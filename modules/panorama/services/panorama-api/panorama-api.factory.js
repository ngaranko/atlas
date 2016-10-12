(function () {
    'use strict';

    angular
        .module('dpPanorama')
        .factory('panoramaApi', panoramaApiFactory);

    panoramaApiFactory.$inject = ['panoramaConfig', 'sharedConfig', 'geojson', 'api'];

    function panoramaApiFactory (panoramaConfig, sharedConfig, geojson, api) {
        return {
            getImageDataById: getImageDataById
        };

        function getImageDataById (id) {
            return api.getByUrl(panoramaConfig.PANORAMA_ENDPOINT + id + '/').then(function (response) {
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
                    // image: response.images.cubic
                    image: 'https://acc.atlas.amsterdam.nl/panorama/2016/03/21/TMX7315120208-000021/pano_0000_000329_' +
                        'cubic/'
                };
            });
        }
    } 
})(); 


