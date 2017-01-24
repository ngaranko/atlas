(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpToggleDrawingTool', {
            templateUrl: 'modules/map/components/toggle-drawing-tool/toggle-drawing-tool.html',
            controller: DpToggleDrawingToolController,
            controllerAs: 'vm'
        });

    DpToggleDrawingToolController.$inject = ['$scope', 'drawTool'];

    function DpToggleDrawingToolController ($scope, drawTool) {
        let vm = this;

        // Follow enable/disable status of the drawing tool
        vm.isEnabled = drawTool.isEnabled;

        vm.shape = drawTool.shape;

        vm.toggle = () => {
            return drawTool.isEnabled() ? drawTool.disable() : drawTool.enable();
        };

        // Follow the shape that is drawn or edited by the drawing tool
        // Currently show the number of markers that is available to add to the shape
        $scope.$watch(() => drawTool.shape, () => {
            vm.markersLeft = drawTool.shape.markersMaxCount - drawTool.shape.markers.length;
        }, true);
    }
})();
