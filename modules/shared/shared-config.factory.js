(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('sharedConfig', sharedConfigFactory);

    sharedConfigFactory.$inject = ['environment'];

    function sharedConfigFactory (environment) {
        var globalConfig,
            environmentConfig;

        globalConfig = {
            RADIUS: 50,
            THUMBNAIL_WIDTH: 240
        };


        environmentConfig = {
            DEVELOPMENT: {
                STRAATBEELD_THUMB_URL: 'https://api-acc.datapunt.amsterdam.nl/straatbeeld/thumbnail/'
            },
            PRODUCTION: {
                STRAATBEELD_THUMB_URL: 'https://api.datapunt.amsterdam.nl/straatbeeld/thumbnail/'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();