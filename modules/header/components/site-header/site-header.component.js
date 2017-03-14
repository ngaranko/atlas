(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpSiteHeader', {
            bindings: {
                query: '@',
                hasPrintButton: '<',
                size: '='
            },
            templateUrl: 'modules/header/components/site-header/site-header.html',
            controller: DpSiteHeaderController,
            controllerAs: 'vm'
        });

    DpSiteHeaderController.$inject = ['$scope'];

    function DpSiteHeaderController ($scope) {
        let vm = this;

        $scope.$watch('vm.size', updateSize);

        updateSize(vm.size);

        function updateSize (size) {
            vm.size = size === 'tall' ? 'tall' : 'short';
            vm.menuSize = vm.size === 'tall' ? 'short' : 'tall';
            vm.isTall = vm.size === 'tall';
            vm.isShort = vm.size === 'short';
        }
    }
})();
