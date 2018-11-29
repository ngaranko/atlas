(function () {
    'use strict';

    angular
        .module('dpShared')
        .filter('removeSpaces', removeSpaces);

    function removeSpaces () {
        return function (input) {
            return (input) ? input.toLowerCase().replace(/[: ][ ]*/g, '-') : '';
        };
    }
})();
