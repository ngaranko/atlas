(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('userSettings', userSettingsFactory);

    userSettingsFactory.$inject = ['storage'];

    function userSettingsFactory (storage) {
        class Setting {
            /**
             * @param {String} key the name of the setting
             * @param {storage} storageProvider the storage where to store its value
             * @param {String} defaultValue the default value to return when no value is available
             */
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

        /**
         * Return a setting for each key
         * This allows for compile time checking of settings and prevents:
         * - magic strings  eg userSettings.set('token', ...)
         * - constant definitions, eg userSettingsConstants = { 'token': ... }
         * - runtime checks eg if angular.isString(key)...
         */
        return {
            token: new Setting('token', storage.session),
            fullscreenStraatbeeld: new Setting('fullscreenStraatbeeld', storage.local, true.toString())
        };
    }
})();
