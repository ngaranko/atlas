(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('apiConfig', apiConfigFactory);

    apiConfigFactory.$inject = ['environment'];

    function apiConfigFactory (environment) {
        let globalConfig,
            environmentConfig;

        globalConfig = {
            AUTH: 'authenticatie/'
        };

        environmentConfig = {
            PRODUCTION: {
                ROOT: 'https://api.datapunt.amsterdam.nl/'
            },
            ACCEPTATION: {
                ROOT: 'https://api-acc.datapunt.amsterdam.nl/'
            },
            DEVELOPMENT: {
                ROOT: 'https://api.datapunt.amsterdam.nl/'
            }
        };

        return angular.merge(globalConfig, environmentConfig[environment.NAME]);
    }
})();
