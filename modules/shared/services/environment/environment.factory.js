(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('environment', environmentFactory);

    environmentFactory.$inject = ['$location'];

    function environmentFactory ($location) {
        let config = {};

        switch ($location.host()) {
            case 'atlas.amsterdam.nl':
            case 'data.amsterdam.nl':
                config.NAME = 'PRODUCTION';
                break;

            default:
                config.NAME = 'DEVELOPMENT';
        }

        return config;
    }
})();
