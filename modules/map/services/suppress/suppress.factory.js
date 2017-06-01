(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('suppress', suppressFactory);

    suppressFactory.$inject = ['$timeout'];

    function suppressFactory ($timeout) {
        let suppressing = false;

        return {
            isBusy: () => suppressing,
            start: (period = 100) => {
                suppressing = true;
                $timeout(() => {
                    suppressing = false;
                }, period);
            }
        };
    }
})();
