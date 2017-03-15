(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpLogoutButton', {
            templateUrl: 'modules/header/components/logout-button/logout-button.html',
            controller: DpLogoutButtonController,
            controllerAs: 'vm'
        });

    DpLogoutButtonController.$inject = ['user'];

    function DpLogoutButtonController (user) {
        var vm = this;

        vm.logout = user.logout;
    }
})();
