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

    DpHeaderController.$inject = ['$scope', 'authenticator', '$location', 'userSettings'];

    function DpHeaderController (scope, authenticator, $location, userSettings) {
        var vm = this;

        vm.authenticate = authenticator.login;
        vm.logOut = authenticator.logOut;

        vm.isAuthenticated = function () {
            return false; // authenticator.getStatus().isLoggedIn;
        };
    }
})();
