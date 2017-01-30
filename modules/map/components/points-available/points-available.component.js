(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpPointsAvailable', {
            bindings: {},
            templateUrl: 'modules/map/components/points-available/points-available.html',
            controller: DpPointsAvailableController,
            controllerAs: 'vm'
        });

    DpPointsAvailableController.$inject = ['$scope', 'drawTool'];

    function DpPointsAvailableController ($scope, drawTool) {
        let vm = this;

        $scope.$watchCollection(function () {
            return drawTool.shape;
        }, setPoints);

        function setPoints () {
            console.log('--------------- hello -------------------', vm);
            vm.drawingMode = drawTool.isEnabled();
            vm.markers = drawTool.shape.markers;
            vm.markersLeft = drawTool.shape.markersMaxCount - drawTool.shape.markers.length;
            vm.pointText = (vm.markersLeft === 1) ? 'punt' : 'punten';
        }
    }
})();
