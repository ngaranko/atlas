(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('debounce', debounceService);

    debounceService.$inject = ['$timeout'];

    function debounceService ($timeout) {
        let isIgnoringInput = false;

        return {
            isInDebouncePeriod: () => isIgnoringInput,
            startDebouncePeriod: (period = 100) => {
                isIgnoringInput = true;
                $timeout(() => {
                    isIgnoringInput = false;
                }, period);
            }
        };
    }
})();
