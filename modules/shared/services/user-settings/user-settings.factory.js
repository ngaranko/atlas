(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('userSettings', userSettingsFactory);

    userSettingsFactory.$inject = ['storage'];

    function userSettingsFactory (storage) {
        class Setting {
            constructor (key, storageProvider, defaultValue) {
                this._key = key;
                this._storage = storageProvider;
                this._defaultValue = defaultValue;
            }
            set value (value) {
                this._storage.setItem(this._key, value);
            }
            get value () {
                let keyValue = this._storage.getItem(this._key);
                return keyValue === null ? this._defaultValue : keyValue;
            }
            remove () {
                this._storage.removeItem(this._key);
            }
        }

        return {
            token: new Setting('token', storage.session),
            fullscreenStraatbeeld: new Setting('fullscreenStraatbeeld', storage.local, true.toString())
        };
    }
})();
