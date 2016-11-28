(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('verblijfsobjectGevormd', verblijfsobjectGevormdFilter);

    function verblijfsobjectGevormdFilter () {
        return function (input) {
            return '';
        };
    }
})();
