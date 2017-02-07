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

        console.log(">>>", authentication);

        vm.isAuthenticated = function () {
            return authentication.getStatus().isLoggedIn;
        };

        vm.authenticate = authentication.authenticate;
    }
})();
