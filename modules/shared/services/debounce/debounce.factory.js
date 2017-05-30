(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('debounce', debounceService);

    debounceService.$inject = ['$timeout'];

    function debounceService ($timeout) {
        let isIgnoringInput = false;

        return {
            isInDebouncePeriod: () => isIgnoringInput,
            startDebouncePeriod: () => {
                console.log('startDebouncePeriod');

                isIgnoringInput = true;
                $timeout(() => {
                    isIgnoringInput = false;
                    console.log('startDebouncePeriod RESET');
                }, 100);
            }
        };
    }
})();
