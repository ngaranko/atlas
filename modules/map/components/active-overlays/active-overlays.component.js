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

        $scope.$watchCollection('vm.overlays', function () {
            vm.hideEverything = vm.overlays.length === 0;
        });
    }
})();