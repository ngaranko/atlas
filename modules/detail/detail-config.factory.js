(function () {
    'use strict';

    angular
        .module('atlasDetail')
        .factory('detailConfig', detailConfigFactory);

    detailConfigFactory.$inject = ['environment'];

    function detailConfigFactory (environment) {
        var globalConfig,
            environmentConfig;

        globalConfig = {};

        environmentConfig = {
            DEVELOPMENT: {
                STRAATBEELD_THUMB_URL: 'https://api-acc.datapunt.amsterdam.nl/panorama/thumbnail/'
            },
            PRODUCTION: {
                STRAATBEELD_THUMB_URL: 'https://map.datapunt.amsterdam.nl/earthmine/get_views.php'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();