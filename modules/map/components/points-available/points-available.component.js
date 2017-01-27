(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpPointsAvailable', {
            bindings: {
                points: '='
            },
            templateUrl: 'modules/map/components/points-available/points-available.html',
            controller: DpPointsAvailableController,
            controllerAs: 'vm'
        });

    DpPointsAvailableController.$inject = ['$scope', 'store', 'ACTIONS', 'DRAW_TOOL_CONFIG', 'drawTool'];

    function DpPointsAvailableController ($scope, store, ACTIONS, DRAW_TOOL_CONFIG, drawTool) {
        let vm = this;
        vm.store = store;
        vm.pointsAvailable = 0;

        store.subscribe(setPoints);

        function setPoints () {
            const state = store.getState();
            vm.drawingMode = state.map.drawingMode;
            vm.markers = drawTool.shape.markers;
            vm.markersLeft = drawTool.shape.markersMaxCount - drawTool.shape.markers.length;
            vm.pointText = (vm.markersLeft === 1) ? 'punt' : 'punten';
        }
    }
})();
