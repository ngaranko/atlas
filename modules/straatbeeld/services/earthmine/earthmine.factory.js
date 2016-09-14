(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('earthmine', earthmine);

    earthmine.$inject = ['$http', 'straatbeeldConfig', 'earthmineDataFormatter'];

    function earthmine ($http, straatbeeldConfig, earthmineDataFormatter) {
        return {
            getImageDataById: getImageDataById,
            getImageDataByCoordinates: getImageDataByCoordinates,
            getImageSourceUrl: getImageSourceUrl
        };

        function getImageDataById (id) {
           return getImageData(
                straatbeeldConfig.PANORAMA_ENDPOINT + id + '/',
                {
                    radius: 100
                }
            );
        }

        function getImageDataByCoordinates (latitude, longitude) {
            return getImageData(
                straatbeeldConfig.PANORAMA_ENDPOINT,
                {
                    lat: latitude,
                    lon: longitude,
                    radius: 100
                }
            );
        }

        function getImageData (url, searchParams) {
            return $http({
                method: 'GET',
                url: url,
                params: searchParams
            }).then(function (response) {
                return response.data; 
            });
        }

        function getImageSourceUrl (sceneId) {
            return straatbeeldConfig.TILE_ENDPOINT + '?id=' + sceneId + '&f={f}&z={z}&x={x}&y={y}';
        }
    }
})();
