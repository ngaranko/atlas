(function () {
    'use strict';

    angular
        .module('dpShared')
        .filter('atlasUppercaseFirstLetter', atlasUppercaseFirstLetterFilter);

    function atlasUppercaseFirstLetterFilter () {
        return function (input) {
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    }
})();
