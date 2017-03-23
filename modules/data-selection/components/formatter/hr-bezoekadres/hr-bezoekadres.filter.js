(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('hrBezoekadres', hrBezoekadresFilter);

    hrBezoekadresFilter.$inject = [
        'user'
    ]
    function hrBezoekadresFilter (user) {
        return function (input) {
            if (input.non_mailing && !user.getStatus().isLoggedIn) {
                // Also user not logged in
                return 'Non-mailing-indicatie actief';
            }
            return input.bezoekadres_volledig_adres;
        };
    }
})();
