(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpHeader', {
            bindings: {
                query: '@',
                hasPrintButton: '<',
                isPrintMode: '='
            },
            templateUrl: 'modules/header/components/header/header.html',
            controller: DpHeaderController,
            controllerAs: 'vm'
        });

    DpHeaderController.$inject = ['authenticator', 'user'];

    function DpHeaderController (authenticator, user) {
        var vm = this;

        vm.authenticate = authenticator.login;
        vm.logOut = authenticator.logout;

        vm.isAuthenticated = function () {
            return user.getUserType() === user.USER_TYPE.AUTHENTICATED;
        };
    }
})();
