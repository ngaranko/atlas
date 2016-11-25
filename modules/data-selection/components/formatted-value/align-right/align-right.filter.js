(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('alignRight', alignRightFilter);

    function alignRightFilter () {
        return function (input) {
            return input;
        };
    }
})();
