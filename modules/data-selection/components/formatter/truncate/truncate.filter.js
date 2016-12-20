(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('truncate', truncate);

    function truncate () {
        return function (input) {
            return input.replace(/<[^>]+>/gm, '').substring(0, 150);
        };
    }
})();
