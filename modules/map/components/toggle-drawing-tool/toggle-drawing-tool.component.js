(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpToggleDrawingTool', {
            templateUrl: 'modules/map/components/toggle-drawing-tool/toggle-drawing-tool.html',
            controller: DpToggleDrawingToolController,
            controllerAs: 'vm'
        });

    DpToggleDrawingToolController.$inject = ['$scope', 'drawTool', 'store', 'ACTIONS'];

    function DpToggleDrawingToolController ($scope, drawTool, store, ACTIONS) {
        let vm = this;

        // Follow enable/disable status of the drawing tool
        vm.isEnabled = drawTool.isEnabled;

        vm.shape = drawTool.shape;

        vm.toggle = () => {
            if (drawTool.isEnabled()) {
                drawTool.disable();
            } else {
                if (drawTool.shape.markers.length > 0) {
                    drawTool.setPolygon([]);
                }
                drawTool.enable();
            }
        };

        // Follow the shape that is drawn or edited by the drawing tool
        // Currently show the number of markers that is available to add to the shape
        $scope.$watch(() => drawTool.shape, () => {
            store.dispatch({
                type: ACTIONS.MAP_SET_POINT
            });
        }, true);
    }
})();
