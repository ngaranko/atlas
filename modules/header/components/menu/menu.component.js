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

    DpMenuController.$inject = ['$scope', 'user', 'HEADER'];

    function DpMenuController ($scope, user, HEADER) {
        var vm = this;

        vm.isLoggedIn = function () {
            return user.getStatus().isLoggedIn;
        };
    }
})();
