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

    DpActiveOverlaysController.$inject = ['$scope', 'overlays'];

    function DpActiveOverlaysController ($scope, overlays) {
        var vm = this;

        $scope.$watchGroup(['vm.overlays', 'vm.showActiveOverlays'], function () {
            vm.validOverlays = vm.overlays.filter(overlay => overlays.SOURCES[overlay.id]);
            vm.visible = vm.showActiveOverlays && vm.overlays.length > 0;
        }, true);
    }
})();
