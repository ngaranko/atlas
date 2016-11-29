(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('bagAddress', bagAddressFilter);

    function bagAddressFilter () {
        return function (input) {
            const nummer = input.huisnummer + input.huisletter,
                fullNummer = input.huisnummer_toevoeging ? nummer + '-' + input.huisnummer_toevoeging : nummer;

            return input._openbare_ruimte_naam + ' ' + fullNummer;
        };
    }
})();
