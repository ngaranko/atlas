(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpMenu', {
            bindings: {
                hasPrintButton: '<',
                isToolbar: '='
            },
            templateUrl: 'modules/header/components/menu/menu.html',
            controller: DpMenuController,
            controllerAs: 'vm'
        });

    DpMenuController.$inject = ['authenticator', 'user'];

    function DpMenuController (authenticator, user) {
        var vm = this;

        vm.login = authenticator.login;

        vm.isAuthenticated = () => user.getUserType() === user.USER_TYPE.AUTHENTICATED;
    }
})();
