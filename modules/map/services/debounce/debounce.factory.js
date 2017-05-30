(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('debounce', debounceFactory);

    debounceFactory.$inject = ['$timeout'];

    function debounceFactory ($timeout) {
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
