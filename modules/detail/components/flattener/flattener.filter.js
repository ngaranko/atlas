(function () {
    'use strict';

    angular
        .module('dpDetail')
        .filter('flattener', flattenerFilter);

    function flattenerFilter () {
        function flatten (arr) {
            return arr.reduce((prev, curr) => prev.concat(angular.isArray(curr) ? flatten(curr) : curr), []);
        }

        return array => {
            if (!angular.isArray(array)) {
                return [];
            }

            return flatten(array);
        };
    }
})();
