import { getEnvironment, ENVIRONMENTS } from '../../../../src/shared/environment';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('environment', environmentFactory);

    environmentFactory.$inject = ['$location'];

    function environmentFactory ($location) {
        console.log($location.host())
        const config = {
            NAME: getEnvironment($location.host())
        };
        config.isDevelopment = () => config.NAME === ENVIRONMENTS.DEVELOPMENT;
        return config;
    }
})();
