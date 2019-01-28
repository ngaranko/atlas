(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionToggleViewButton', {
            bindings: {
                view: '<'
            },
            templateUrl: 'modules/data-selection/components/header/toggle-view-button/toggle-view-button.html',
            controller: DpToggleViewButtonController,
            controllerAs: 'vm'
        });

    DpToggleViewButtonController.$inject = ['$scope'];

    function DpToggleViewButtonController ($scope) {
        const vm = this;

        $scope.$watch('vm.view', function () {
            if (vm.view === 'TABLE') {
                vm.targetView = 'LIST';
                vm.targetLabel = 'Kaart weergeven';
                vm.targetHover = 'Resultaten op de kaart weergeven';
                vm.targetIcon = 'kaart';
            } else {
                vm.targetView = 'TABLE';
                vm.targetLabel = 'Tabel weergeven';
                vm.targetHover = 'Resultaten in tabel weergeven';
                vm.targetIcon = 'list';
            }
        });
    }
})();
