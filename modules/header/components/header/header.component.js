(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpHeader', {
            bindings: {
                query: '@',
                hasPrintButton: '<',
                size: '='
            },
            templateUrl: 'modules/header/components/header/header.html',
            controller: DpHeaderController,
            controllerAs: 'vm'
        });

    DpHeaderController.$inject = ['$scope'];

    function DpHeaderController ($scope) {
        let vm = this;

        $scope.$watch('vm.size', updateSize);

        updateSize(vm.size);

        function updateSize (size) {
            vm.size = size === 'tall' ? 'tall' : 'short';
            vm.isTall = vm.size === 'tall';
            vm.isShort = vm.size === 'short';
        }
    }
})();
