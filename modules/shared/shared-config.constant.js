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
                STRAATBEELD_THUMB_URL: 'https://api.datapunt.amsterdam.nl/panorama/thumbnail/'
            },
            ACCEPTATION: {
                STRAATBEELD_THUMB_URL: 'https://api-acc.datapunt.amsterdam.nl/panorama/thumbnail/'
            },
            DEVELOPMENT: {
                STRAATBEELD_THUMB_URL: 'https://api.datapunt.amsterdam.nl/panorama/thumbnail/'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
