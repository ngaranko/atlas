(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpLogo', {
            bindings: {
                size: '='
            },
            templateUrl: 'modules/header/components/logo/logo.html',
            controller: DpLogoController,
            controllerAs: 'vm'
        });

    DpLogoController.$inject = ['$scope'];

    function DpLogoController ($scope) {
        let vm = this;

        $scope.$watch('vm.size', updateSize);

        updateSize(vm.size);

        function updateSize (size) {
            vm.size = size === 'tall' ? 'tall' : 'short';
            vm.isTall = vm.size === 'tall';
            vm.isShort = vm.size === 'short';
            let logoSize = vm.isShort ? '-small' : '';
            vm.logo = `assets/images/logo${logoSize}.svg`
        }
    }
})();
