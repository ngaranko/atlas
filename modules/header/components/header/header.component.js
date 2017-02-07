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

    function DpHeaderController (user) {
        var vm = this;

        vm.authenticated = function () {
            return false;//authentication.getStatus().isLoggedIn;
        };
        console.log('x', authentication);
        vm.authenticate = authentication.authenticate;
        console.log(vm.authentication);
    }
})();
