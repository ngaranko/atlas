(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpActiveOverlays', {
            bindings: {
                overlays: '=',
                zoom: '=',
                showActiveOverlays: '=',
                user: '<'
            },
            templateUrl: 'modules/map/components/active-overlays/active-overlays.html',
            controller: DpActiveOverlaysController,
            controllerAs: 'vm'
        });

    DpActiveOverlaysController.$inject = ['$scope', 'overlays', 'activeOverlays'];

    function DpActiveOverlaysController ($scope, overlays, activeOverlays) {
        var vm = this;

        $scope.$watchGroup(['vm.user.scopes', 'vm.overlays', 'vm.showActiveOverlays'], setOverlays, true);

        function setOverlays () {
            vm.validOverlays = vm.overlays.filter(overlay => overlays.SOURCES[overlay.id]);
            vm.visible = vm.showActiveOverlays && vm.overlays.length > 0;

            activeOverlays.setOverlays(vm.validOverlays);
        }
    }
})();
