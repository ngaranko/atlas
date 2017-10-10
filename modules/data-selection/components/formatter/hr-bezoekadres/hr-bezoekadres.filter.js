(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('hrBezoekadres', hrBezoekadresFilter);

    function hrBezoekadresFilter () {
        return function (input) {
            // Only return the address to form the label. The `non_mailing`
            // indicatie will be used in the template as a condition however.
            return input.bezoekadres_volledig_adres;
        };
    }
})();
