(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('USER_SETTINGS', {
            test: {
                storage: 'session'
            },
            refreshToken: {
                storage: 'session'
            },
            fullscreenStraatbeeld: {
                storage: 'local',
                default: true.toString()
            },
            showCatalogusIntroduction: {
                storage: 'session',
                default: true.toString()
            }
        });
})();
