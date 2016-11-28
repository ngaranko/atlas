(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('nummeraanduidingType', nummeraanduidingTypeFilter);

    function nummeraanduidingTypeFilter () {
        return function (input) {
            return '';
        };
    }
})();
