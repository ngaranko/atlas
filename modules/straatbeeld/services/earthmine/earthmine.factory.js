(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('earthmine', earthmine);

    earthmine.$inject = ['$http', 'straatbeeldConfig', 'detailConfig'];

    function earthmine ($http, straatbeeldConfig, detailConfig) {
        return {
            getImageDataById: getImageDataById,
            getImageDataByCoordinates: getImageDataByCoordinates
        };

        function getImageDataById (id) {
           return getImageData(
                straatbeeldConfig.PANORAMA_ENDPOINT + id + '/',
                {
                    radius: detailConfig.RADIUS
                }
            );
        }

        function getImageDataByCoordinates (latitude, longitude) {
            return getImageData(
                straatbeeldConfig.PANORAMA_ENDPOINT,
                {
                    lat: latitude,
                    lon: longitude,
                    radius: detailConfig.RADIUS
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
    }
})();
