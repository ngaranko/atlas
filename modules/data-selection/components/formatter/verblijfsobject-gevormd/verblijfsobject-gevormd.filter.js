(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('verblijfsobjectGevormd', verblijfsobjectGevormdFilter);

    function verblijfsobjectGevormdFilter () {
        return function (input) {
            const VERBLIJFSOBJECT_GEVORMD = 18;
            const isVerblijfsobjectGevormd = Number(input.status_id) === VERBLIJFSOBJECT_GEVORMD;

            return isVerblijfsobjectGevormd ? '(verblijfsobject gevormd)' : '';
        };
    }
})();
