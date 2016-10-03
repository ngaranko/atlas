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
            MAX_RESOLUTION: 2000,
            CAMERA_HEIGHT: 1.7
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
