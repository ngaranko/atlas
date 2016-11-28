(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('nevenadres', nevenadresFilter);

    function nevenadresFilter () {
        return function (input) {
            const isNevenadres = String(input.hoofdadres).toLowerCase() === 'false';
            console.log(input);

            return isNevenadres ? '(nevenadres)' : '';
        };
    }
})();
