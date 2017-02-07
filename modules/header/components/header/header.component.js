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

    DpHeaderController.$inject = ['authentication'];

    function DpHeaderController (authentication) {
        var vm = this;

        vm.isAuthenticated = function () {
            return authentication.getStatus().isLoggedIn;
        };

        vm.authenticate = authentication.authenticate;

        // Am I in the process of gettng a response from SIAM? Check the URL for needed parameters and fetch token
        authentication.fetchToken();
    }
})();
