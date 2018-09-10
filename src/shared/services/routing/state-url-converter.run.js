(function () {
    'use strict';

    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['$window', 'stateUrlConverter'];

    function runBlock ($window, stateUrlConverter) {
        $window.StateUrlConverter = stateUrlConverter;
    }
})();
