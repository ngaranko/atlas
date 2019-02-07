import { navigateHomeAction } from '../../../../src/header/ducks/actions';
import { routing } from '../../../../src/app/routes';

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

    DpLogoController.$inject = ['$scope', 'store', 'HEADER'];

    function DpLogoController ($scope, store, HEADER) {
        const vm = this;

        this.$onInit = function () {
            vm.homeType = routing.home.type;

            $scope.$watch('vm.size', updateSize);

            vm.navigateHomeClick = () => store.dispatch(navigateHomeAction());

            function updateSize (size) {
                vm.isTall = vm.size === HEADER.SIZE.TALL;
                vm.isShort = vm.size === HEADER.SIZE.SHORT;
            }
        };
    }
})();
