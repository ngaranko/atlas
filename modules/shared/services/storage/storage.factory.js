(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('storage', storageFactory);

    storageFactory.$inject = [];

    function storageFactory () {
        let storageAvailable = testStorage();

        return {
            testStorage: testStorage,
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem
        };

        function testStorage () {
            try {
                sessionStorage.setItem('test', 'testvalue');
                let data = sessionStorage.getItem('test');
                if (data !== 'testvalue') {
                    throw new Error('getItem does not work');
                }
                sessionStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        }

        function setItem (key, value) {
            if (storageAvailable) {
                sessionStorage.setItem(key, value);
            } else {
                return null;
            }
        }

        function getItem (key) {
            if (storageAvailable) {
                return sessionStorage.getItem(key);
            } else {
                return null;
            }
        }

        function removeItem (key) {
            if (storageAvailable) {
                sessionStorage.removeItem(key);
            } else {
                return null;
            }
        }
    }
})();
