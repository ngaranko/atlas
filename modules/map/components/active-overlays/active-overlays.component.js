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
            vm.hideEverything = vm.overlays.length === 0;
        });
    }
})();