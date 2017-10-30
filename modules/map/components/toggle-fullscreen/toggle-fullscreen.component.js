(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpToggleFullscreen', {
            bindings: {
                isFullscreen: '='
            },
            templateUrl: 'modules/map/components/toggle-fullscreen/toggle-fullscreen.html',
            controller: DpToggleFullscreenController,
            controllerAs: 'vm'
        });

    DpToggleFullscreenController.$inject = ['$scope', 'store'];

    function DpToggleFullscreenController ($scope, store) {
        const vm = this;

        vm.toggle = () => store.dispatch({ type: { id: 'MAP_FULLSCREEN' }, payload: !vm.isFullscreen });

        $scope.$watch('vm.isFullscreen', function () {
            vm.buttonText = `Kaart ${vm.isFullscreen ? 'verkleinen' : 'vergroten'}`;
        });
    }
})();
