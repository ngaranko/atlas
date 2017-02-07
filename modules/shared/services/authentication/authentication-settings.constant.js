(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('AUTHENTICATION_SETTINGS', {
            DEVELOPMENT: {
                ENDPOINT: 'http://localhost:8000/'
            }
        });
})();
