(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('sharedConfig', sharedConfigFactory);

    sharedConfigFactory.$inject = ['environment'];

    function sharedConfigFactory (environment) {
        let globalConfig,
            environmentConfig;

        globalConfig = {
            RADIUS: 50,
            THUMBNAIL_WIDTH: 240
        };

        environmentConfig = {
            PRODUCTION: {
                API_ROOT: 'https://api.datapunt.amsterdam.nl/',
                STRAATBEELD_THUMB_URL: 'panorama/thumbnail/'
            },
            ACCEPTATION: {
                API_ROOT: 'https://api-acc.datapunt.amsterdam.nl/',
                STRAATBEELD_THUMB_URL: 'panorama/thumbnail/'
            },
            DEVELOPMENT: {
                API_ROOT: 'https://api.datapunt.amsterdam.nl/',
                STRAATBEELD_THUMB_URL: 'panorama/thumbnail/'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
