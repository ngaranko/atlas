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

    DpMenuController.$inject = ['$scope', 'authenticator', 'user'];

    function DpMenuController ($scope, authenticator, user) {
        var vm = this;

        vm.login = authenticator.login;

        vm.isAuthenticated = () => user.getUserType() === user.USER_TYPE.AUTHENTICATED;

        $scope.$watch('vm.size', updateSize);

        updateSize(vm.size);

        function updateSize (size) {
            vm.size = size === 'tall' ? 'tall' : 'short';
            vm.isTall = vm.size === 'tall';
            vm.isShort = vm.size === 'short';
        }
    }
})();
