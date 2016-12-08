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

    DpHeaderController.$inject = ['user', 'httpStatus'];

    function DpHeaderController (user, httpStatus) {
        var vm = this;

        vm.registerError = (event) => {
            httpStatus.registerError(httpStatus.SERVER_ERROR);
            event.preventDefault();
        }

        vm.isLoggedIn = function () {
            return user.getStatus().isLoggedIn;
        };

        vm.logout = user.logout;
    }
})();
