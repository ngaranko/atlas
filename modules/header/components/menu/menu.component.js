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

    DpMenuController.$inject = ['$scope', 'user'];

    function DpMenuController ($scope, user) {
        var vm = this;

        vm.isLoggedIn = function () {
            return user.getStatus().isLoggedIn;
        };

        $scope.$watch('vm.size', updateSize);

        updateSize(vm.size);

        function updateSize (size) {
            vm.size = size === 'tall' ? 'tall' : 'short';
            vm.isTall = vm.size === 'tall';
            vm.isShort = vm.size === 'short';
        }
    }
})();
