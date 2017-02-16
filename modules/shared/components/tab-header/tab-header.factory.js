(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('tabHeader', tabHeaderFactory);

    tabHeaderFactory.$inject = [];

    function tabHeaderFactory () {
        let counters = {};

        return {
            registerCounter,
            getCounter
        };

        function registerCounter (id, getCount) {
            counters[id] = getCount;
        }

        function getCounter (id) {
            return counters[id];
        }
    }
})();
