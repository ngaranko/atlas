(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .component('dpStraatbeeldFullscreen', {
            restrict: 'E',
            bindings: {
                state: '<'
            },
            templateUrl:
            'modules/straatbeeld/components/toggle-straatbeeld-fullscreen/toggle-straatbeeld-fullscreen.html',
            controller: DpStraatbeeldFullscreenController,
            controllerAs: 'vm'
        });

    DpStraatbeeldFullscreenController.$inject = ['store', 'ACTIONS'];

    function DpStraatbeeldFullscreenController (store, ACTIONS) {
        let vm = this;

        vm.toggleFullscreen = function () {
            store.dispatch({
                type: ACTIONS.STRAATBEELD_FULLSCREEN,
                payload: !vm.state.isFullscreen
            });
        };
    }
})();

