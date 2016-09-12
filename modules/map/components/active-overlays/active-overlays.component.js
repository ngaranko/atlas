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

    DpActiveOverlaysController.$inject = ['$scope', 'OVERLAYS', 'store', 'ACTIONS'];

    function DpActiveOverlaysController ($scope, OVERLAYS, store, ACTIONS) {
        var vm = this;

        vm.toggle = function () {
            store.dispatch({
                type: ACTIONS[!vm.showActiveOverlays ? 'SHOW_ACTIVE_OVERLAYS' : 'HIDE_ACTIVE_OVERLAYS']
            });
        };

        $scope.$watchCollection('vm.overlays', function () {
            var numberOfShownOverlays,
                numberOfActiveOverlays;

            numberOfShownOverlays = vm.overlays.filter(function (overlay) {
                return overlay.isVisible && isVisibleAtCurrentZoom(overlay.id, vm.zoom);
            }).length;
            numberOfActiveOverlays = vm.overlays.length;

            vm.hideEverything = numberOfActiveOverlays === 0;
            vm.buttonText = 'Kaartlagen (';

            if (numberOfShownOverlays !== numberOfActiveOverlays) {
                vm.buttonText += numberOfShownOverlays + '/';
            }

            vm.buttonText += numberOfActiveOverlays + ')';
        });

        function isVisibleAtCurrentZoom (overlay, zoom) {
            return zoom >= OVERLAYS.SOURCES[overlay].minZoom && zoom <= OVERLAYS.SOURCES[overlay].maxZoom;
        }
    }
})();