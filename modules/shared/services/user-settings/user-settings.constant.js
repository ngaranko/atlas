(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('USER_SETTINGS', {
            token: {
                storage: 'session'
            },
            fullscreenStraatbeeld: {
                storage: 'local',
                default: true.toString()
            }
        });
})();