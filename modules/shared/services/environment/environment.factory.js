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

            case 'acc.atlas.amsterdam.nl':
            case 'acc.data.amsterdam.nl':
                config.NAME = 'ACCEPTATION';
                break;

            default:
                config.NAME = 'DEVELOPMENT';
        }

        return config;
    }
})();
