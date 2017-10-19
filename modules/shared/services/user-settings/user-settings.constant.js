(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('USER_SETTINGS', {
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
