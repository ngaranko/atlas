(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('API_CONFIG', {
            AUTH: 'auth',
            AUTH_HEADER_PREFIX: 'Bearer '
        });
})();
