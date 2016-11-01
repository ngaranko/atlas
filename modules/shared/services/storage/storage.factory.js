(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('storage', storageFactory);

    storageFactory.$inject = [];

    function storageFactory () {
        return {
            testStorage: testStorage,
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem
        };

        function testStorage () {
            try {
                sessionStorage.setItem('test', 'testvalue');
                var data = sessionStorage.getItem('test');
                if (data !== 'testvalue') {
                    throw new Error('getItem does not work');
                }
                sessionStorage.removeItem('test');
            } catch (e) {
                return false;
            }
        }

        function setItem (key, value) {

        }

        function getItem (key) {

        }

        function removeItem (key) {

        }
    }
})();
