(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('storage', storageFactory);

    storageFactory.$inject = ['$window'];

    function storageFactory ($window) {
        // The storage types that is available to the application are:
        // - instance (variables are only available to the current application instance, does not survive a refresh
        // - session (variables are only available to the session, survive a refresh)
        // - local (variables are shared between browser tabs and windows
        // - server (variables are shared between all browsers)

        class InstanceStorage {
            constructor () {
                this._keys = {};
            }
            setItem (key, value) {
                this._keys[key] = value;
            }
            getItem (key) {
                return this._keys[key];
            }
            removeItem (key) {
                delete this._keys[key];
            }
        }

        return {
            instance: new InstanceStorage(),
            session: getStorage($window.sessionStorage),
            local: getStorage($window.localStorage)
        };

        function getStorage (storageProvider) {
            let isAvailable;
            try {
                storageProvider.setItem('test', 'testvalue');
                let data = storageProvider.getItem('test');
                storageProvider.removeItem('test');
                isAvailable = data === 'testvalue';
            } catch (e) {
                isAvailable = false;
            }
            return isAvailable ? storageProvider : new InstanceStorage();
        }
    }
})();
