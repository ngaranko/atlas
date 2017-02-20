(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('API_CONFIG', {
            ROOT: 'https://api.datapunt.amsterdam.nl/',
            AUTH: 'https://api.datapunt.amsterdam.nl/auth',
            AUTHZ_HEADER_PREFIX: 'Bearer '
        });
})();
