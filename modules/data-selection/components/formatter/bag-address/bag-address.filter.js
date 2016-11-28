(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('bagAddress', bagAddressFilter);

    function bagAddressFilter () {
        return function (input) {
            console.log(input);

            return 'Adres';
        };
    }
})();
