(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpShapeSummary', {
            templateUrl: 'modules/map/components/shape-summary/shape-summary.html',
            controller: DpShapeSummaryController,
            controllerAs: 'vm'
        });

    DpShapeSummaryController.$inject = ['$scope', '$sce', 'drawTool'];

    function DpShapeSummaryController ($scope, $sce, drawTool) {
        let vm = this;

        setSummary();
        $scope.$watch(() => drawTool.shape.markers, setSummary, true);
        $scope.$watch(drawTool.isEnabled, setSummary);

        function setSummary () {
            vm.showSummary = !drawTool.isEnabled() && drawTool.shape.markers.length > 0;
            vm.summary = $sce.trustAsHtml(drawTool.shape.distanceTxt + ' en ' + drawTool.shape.areaTxt);
        }
    }
})();
