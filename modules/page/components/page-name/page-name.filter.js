(function () {
    'use strict';

    angular
        .module('dpPage')
        .filter('dpPageName', dpPageNameFilter);

    dpPageNameFilter.$inject = ['pageName'];

    function dpPageNameFilter (pageName) {
        return function (input) {
            return pageName(input);
        };
    }
})();
