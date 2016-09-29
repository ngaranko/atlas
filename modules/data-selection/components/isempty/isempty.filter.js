(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('isempty', isemptyFilter);

    function isemptyFilter () {

        return function (input) {
            return input || '(geen)';
        };
    }
})();
