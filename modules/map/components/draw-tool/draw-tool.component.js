(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpDrawTool', {
            bindings: {
                state: '=',
                polygon: '=',
                map: '='
            },
            templateUrl: 'modules/map/components/draw-tool/draw-tool.html',
            controller: DpDrawToolComponent,
            controllerAs: 'vm'
        });

    DpDrawToolComponent.$inject = ['$scope', 'store', 'ACTIONS', 'drawTool', 'DRAW_TOOL_CONFIG'];

    function DpDrawToolComponent ($scope, store, ACTIONS, drawTool, DRAW_TOOL_CONFIG) {
        var vm = this;

        let previousMarkers;

        drawTool.initialize(vm.map, onFinishShape, onDrawingMode);

        $scope.$watch('vm.state.drawingMode', function (drawingMode, prev) {
            console.log('WATCH drawingMode', drawingMode, prev);
            // enable is handled by the polygon markers watch method
            if (drawingMode === DRAW_TOOL_CONFIG.DRAWING_MODE.NONE) {
                if (vm.state.resetDrawing) {
                    vm.state.geometry = [];
                    vm.state.resetDrawing = false;
                }
                drawTool.disable();
            }
        });

        $scope.$watch('vm.polygon.markers', (markers) => {
            // polygon markers are always set, even if empty
            setPolygon(markers);
        }, true);

        $scope.$watch('vm.state.geometry', (markers) => {
            // when map geometry is empty, set it to polygon
            const geometry = markers || vm.polygon.markers;
            setPolygon(geometry);
        }, true);

        function setPolygon (polygon) {
            if (!drawTool.isEnabled()) {
                drawTool.setPolygon(polygon);
                if (vm.state.drawingMode !== DRAW_TOOL_CONFIG.DRAWING_MODE.NONE) {
                    drawTool.enable();
                }
            }
        }

        function onFinishShape (polygon) {
            const action = {
                type: ACTIONS.MAP_END_DRAWING
            };
            if (!angular.equals(polygon.markers, previousMarkers)) {
                // polygon has changed => update geometry filter
                action.payload = {
                    markers: polygon.markers,
                    description: drawTool.shape.distanceTxt + ' en ' + drawTool.shape.areaTxt
                };
            }
            store.dispatch(action);
        }

        function onDrawingMode (drawingMode) {
            if (drawingMode !== DRAW_TOOL_CONFIG.DRAWING_MODE.NONE) {
                previousMarkers = angular.copy(drawTool.shape.markers);
                store.dispatch({
                    type: ACTIONS.MAP_START_DRAWING,
                    payload: drawingMode
                });
            }
        }
    }
})();
