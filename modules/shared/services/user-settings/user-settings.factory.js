(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('userSettings', userSettingsFactory);

    userSettingsFactory.$inject = ['storage'];

    function userSettingsFactory (storage) {
        const settings = {
            'token': storage.session,
            'fullscreenStraatbeeld': storage.local
        };

        return {
            setItem,
            getItem,
            removeItem
        };

        function setItem (key, value) {
            if (settings[key]) {
                settings[key].setItem(key, value);
            }
        }

        function getItem (key) {
            return settings[key] && settings[key].getItem(key);
        }

        function removeItem (key) {
            if (settings[key]) {
                return settings[key].removeItem(key);
            }
        }
    }
})();
