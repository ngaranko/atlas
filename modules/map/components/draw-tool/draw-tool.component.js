(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpDrawTool', {
            bindings: {
                state: '=',
                map: '='
            },
            controller: DpDrawToolComponent,
            controllerAs: 'vm'
        });

    DpDrawToolComponent.$inject = ['$scope', 'store', 'ACTIONS', 'drawTool'];

    function DpDrawToolComponent ($scope, store, ACTIONS, drawTool) {
        var vm = this;

        drawTool.initialize(vm.map, onFinishShape, onDrawingMode);

        $scope.$watch('state.drawingMode', function (drawingMode) {
            if (drawingMode) {
                drawTool.enable();
            } else {
                drawTool.disable();
            }
        });

        function onFinishShape (polygon) {
            // Dispatch fetch data action...
            if (polygon.markers.length > 2) {
                store.dispatch({
                    type: ACTIONS.FETCH_DATA_SELECTION,
                    payload: {
                        geometryFilters: polygon.markers,
                        filters: {},
                        dataset: 'bag',
                        page: 1,
                        view: 'LIST'
                    }
                });
            }
        }

        function onDrawingMode (drawingMode) {
            if (drawingMode) {
                store.dispatch({
                    type: ACTIONS.MAP_SET_DRAWING_MODE,
                    payload: drawingMode
                });
            }
        }
    }
})();
