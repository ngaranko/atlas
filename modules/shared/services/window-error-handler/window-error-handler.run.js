(function () {
    'use strict';

    angular
        .module('dpShared')
        .run(runBlock);

    runBlock.$inject = ['windowErrorHandler'];

    function runBlock (windowErrorHandler) {
        windowErrorHandler();
    }
})();
