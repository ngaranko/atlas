import { hideEmbedMode, hidePrintMode } from '../../../../src/shared/ducks/ui/ui';

(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpHeader', {
            templateUrl: 'modules/header/components/header/header.html',
            controller: DpHeaderController,
            controllerAs: 'vm',
            bindings: {
                isHomePage: '<',
                hasMaxWidth: '<',
                isPrintMode: '<',
                isEmbedPreview: '<',
                user: '<',
                isPrintOrEmbedOrPreview: '<'
            }
        });

    DpHeaderController.$inject = ['$scope', 'HEADER'];

    function DpHeaderController ($scope, HEADER) {
        const vm = this;

        vm.hidePrintAction = hidePrintMode();
        vm.hideEmbedMode = hideEmbedMode();

        $scope.$watch('vm.isHomePage', updateSize);

        function updateSize () {
            vm.headerSize = vm.isHomePage ? HEADER.SIZE.TALL : HEADER.SIZE.SHORT;
        }

        updateSize();
    }

    DpHeaderController.$inject = ['$scope', 'HEADER'];
})();
