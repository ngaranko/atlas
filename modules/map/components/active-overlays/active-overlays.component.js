(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpActiveOverlays', {
            bindings: {
                overlays: '=',
                zoom: '=',
                showActiveOverlays: '='
            },
            templateUrl: 'modules/map/components/active-overlays/active-overlays.html',
            controller: DpActiveOverlaysController,
            controllerAs: 'vm'
        });

    DpActiveOverlaysController.$inject = ['$scope'];

    function DpActiveOverlaysController ($scope) {
        var vm = this;

        $scope.$watchGroup(['vm.overlays', 'vm.showActiveOverlays'], function () {
            vm.visible = vm.showActiveOverlays && vm.overlays.length > 0;
        }, true);
    }
})();
