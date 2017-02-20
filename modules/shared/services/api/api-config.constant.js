(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('API_CONFIG', {
            ROOT: 'https://api.datapunt.amsterdam.nl/',
            AUTH: 'http://localhost:8109/auth',
            AUTHZ_HEADER_PREFIX: 'Bearer '
        });
})();
