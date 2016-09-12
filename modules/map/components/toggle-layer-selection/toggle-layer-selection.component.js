(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpToggleLayerSelection', {
            bindings: {
                overlays: '=',
                showLayerSelection: '='
            },
            templateUrl: 'modules/map/components/toggle-layer-selection/toggle-layer-selection.html',
            controller: DpToggleLayerSelectionController,
            controllerAs: 'vm'
        });

    DpToggleLayerSelectionController.$inject = ['$scope', 'store', 'ACTIONS'];

    function DpToggleLayerSelectionController ($scope, store, ACTIONS) {
        var vm = this;

        $scope.$watchCollection('vm.overlays', function () {
            vm.buttonText = 'Wijzig';

            if (vm.overlays.length === 0) {
                vm.buttonText += ' kaartlagen';
                vm.buttonSize = 'large';
            } else {
                vm.buttonSize = 'small';
            }
        });

        vm.toggle = function () {
            store.dispatch({
                type: ACTIONS[vm.showLayerSelection ? 'HIDE_LAYER_SELECTION' : 'SHOW_LAYER_SELECTION']
            });
        };
    }
})();