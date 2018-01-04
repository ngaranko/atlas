import { getEnvironment, ENVIRONMENT } from '../../../../src/shared/environment';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('environment', environmentFactory);

    environmentFactory.$inject = ['$location'];

    function environmentFactory ($location) {
        const config = {
            NAME: getEnvironment($location.host())
        };
        config.isDevelopment = () => config.NAME === ENVIRONMENT.DEVELOPMENT;
        return config;
    }
})();
