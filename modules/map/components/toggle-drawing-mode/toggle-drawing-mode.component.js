(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpToggleDrawingMode', {
            templateUrl: 'modules/map/components/toggle-drawing-mode/toggle-drawing-mode.html',
            controller: DpToggleDrawingModeController,
            controllerAs: 'vm'
        });

    DpToggleDrawingModeController.$inject = ['$scope', 'polygon'];

    function DpToggleDrawingModeController ($scope, polygon) {
        let vm = this;
        vm.toggleMode = polygon.toggle;
    }
})();
