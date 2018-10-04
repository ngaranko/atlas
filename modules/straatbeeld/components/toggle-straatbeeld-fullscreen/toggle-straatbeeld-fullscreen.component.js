import { routing } from '../../../../src/app/routes';

(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .component('dpToggleStraatbeeldFullscreen', {
            restrict: 'E',
            bindings: {
                isFullscreen: '<'
            },
            templateUrl:
                'modules/straatbeeld/components/toggle-straatbeeld-fullscreen/toggle-straatbeeld-fullscreen.html',
            controller: DpStraatbeeldFullscreenController,
            controllerAs: 'vm'
        });

    DpStraatbeeldFullscreenController.$inject = ['$scope', 'store'];

    function DpStraatbeeldFullscreenController($scope, store) {
        const vm = this;

        const deregistrationFn = $scope.$watch('vm.isFullscreen', setButtonText);

        function setButtonText() {
            vm.buttonText = 'Panoramabeeld ' + (vm.isFullscreen ? 'verkleinen' : 'vergroten');
        }

        vm.toggleFullscreen = function () {
            store.dispatch({
                type: 'UPDATE_MAP',
                payload: {
                    noRedirect: true,
                    route: (store.getState().location.type === routing.panorama.type) ?
                        routing.mapPanorama.type :
                        routing.panorama.type,
                    query: {
                        panoId: store.getState().straatbeeld.id,
                        panoHeading: store.getState().straatbeeld.heading
                    }
                }
            });
        };

        $scope.$on('$destroy', deregistrationFn);
    }
})();
