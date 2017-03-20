(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpActiveOverlaysItem', {
            bindings: {
                overlay: '@',
                isVisible: '=',
                zoom: '='
            },
            templateUrl: 'modules/map/components/active-overlays/active-overlays-item.html',
            controller: DpActiveOverlaysItemController,
            controllerAs: 'vm'
        });

    DpActiveOverlaysItemController.$inject = ['$scope', 'mapConfig', 'overlays'];

    function DpActiveOverlaysItemController ($scope, mapConfig, overlays) {
        var vm = this;

        vm.overlayExists = Boolean(overlays.SOURCES[vm.overlay]);
        vm.overlayLabel = overlays.SOURCES[vm.overlay] && overlays.SOURCES[vm.overlay].label_short;
        vm.hasLegend = angular.isString(overlays.SOURCES[vm.overlay] && overlays.SOURCES[vm.overlay].legend);

        $scope.$watchCollection(function () {
            return [vm.isVisible, vm.zoom];
        }, updateVisibility);

        function updateVisibility () {
            vm.isOverlayVisible = vm.isVisible && isVisibleAtCurrentZoom(vm.overlay, vm.zoom);

            if (vm.hasLegend) {
                vm.legendImageSrc = getLegendImageSrc(vm.overlay);
            }

            if (vm.isVisible && !isVisibleAtCurrentZoom(vm.overlay, vm.zoom)) {
                vm.overlayMessage = 'Zichtbaar bij verder zoomen';
            } else if (vm.isOverlayVisible && !vm.hasLegend) {
                vm.overlayMessage = '(geen legenda)';
            } else {
                vm.overlayMessage = null;
            }
        }

        function getLegendImageSrc (overlay) {
            var url = '';

            if (overlays.SOURCES[overlay]) {
                if (!overlays.SOURCES[overlay].external) {
                    url += mapConfig.OVERLAY_ROOT;
                }

                url += overlays.SOURCES[overlay].legend;
            }

            return url;
        }

        function isVisibleAtCurrentZoom (overlay, zoom) {
            return overlays.SOURCES[overlay] &&
                zoom >= overlays.SOURCES[overlay].minZoom && zoom <= overlays.SOURCES[overlay].maxZoom;
        }
    }
})();
