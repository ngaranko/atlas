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

        return globalConfig;
    }
})();
