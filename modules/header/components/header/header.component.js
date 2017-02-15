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

    DpHeaderController.$inject = ['$scope', 'authentication', '$location', 'userSettings'];

    function DpHeaderController (scope, authentication, $location, userSettings) {
        var vm = this;

        vm.authenticate = authentication.authenticate;
        vm.logOut = authentication.logOut;

        vm.isAuthenticated = function () {
            return authentication.getStatus().isLoggedIn;
        };
    }
})();
