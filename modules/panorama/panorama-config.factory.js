(function () {
    'use strict';

    angular
        .module('dpPanorama')
        .factory('panoramaConfig', panoramaConfigFactory);

    panoramaConfigFactory.$inject = ['environment'];

    function panoramaConfigFactory (environment) {
        var globalConfig,
            environmentConfig;

        globalConfig = {
            DEFAULT_FOV: 80,
            MAX_FOV: 100,
            MAX_RESOLUTION: 2 * 1024,
            CAMERA_HEIGHT: 1.8,
            LEVEL_PROPERTIES_LIST: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ]
        };

        environmentConfig = {
            DEVELOPMENT: {
                PANORAMA_ENDPOINT: 'https://api-acc.datapunt.amsterdam.nl/panorama/opnamelocatie/'
            },
            PRODUCTION: {
                PANORAMA_ENDPOINT: 'https://api.datapunt.amsterdam.nl/panorama/opnamelocatie/'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
