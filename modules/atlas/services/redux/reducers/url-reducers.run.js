(function () {
    'use strict';

    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['$window', 'urlReducers'];

    function runBlock ($window, urlReducers) {
        $window.reducers = $window.reducers || {};
        $window.reducers.UrlReducers = urlReducers;
    }
})();
