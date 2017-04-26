(function () {
    'use strict';

    angular
        .module('dpDetail')
        .filter('firstInFlattened', firstInFlattenedFilter);

    function firstInFlattenedFilter () {
        function flatten (arr) {
            return arr.reduce((prev, curr) => prev.concat(angular.isArray(curr) ? flatten(curr) : curr), []);
        }

        return array => {
            if (!angular.isArray(array)) {
                return '';
            }

            const flat = flatten(array);

            if (flat.length < 2) {
                return '';
            }
            return `${flat[0]},${flat[1]}`;
        };
    }
})();
