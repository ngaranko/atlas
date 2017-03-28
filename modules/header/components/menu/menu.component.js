(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpMenu', {
            bindings: {
                hasPrintButton: '<',
                size: '='
            },
            templateUrl: 'modules/header/components/menu/menu.html',
            controller: DpMenuController,
            controllerAs: 'vm'
        });

    DpMenuController.$inject = ['authenticator', 'user'];

    function DpMenuController (authenticator, user) {
        const vm = this;

        vm.login = authenticator.login;

        vm.isAuthenticated = () => user.getUserType() === user.USER_TYPE.AUTHENTICATED;

        vm.userName = () => user.getName().replace(/@.*$/, '');

        vm.userIsBevoegd = () => user.getAuthorizationLevel() === user.AUTHORIZATION_LEVEL.EMPLOYEE_PLUS;
    }
})();
