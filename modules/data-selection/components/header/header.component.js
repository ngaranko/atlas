(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionHeader', {
            bindings: {
                state: '=',
                numberOfRecords: '=',
                isLoading: '<'
            },
            templateUrl: 'modules/data-selection/components/header/header.html',
            controllerAs: 'vm',
            controller: DpDataSelectionHeaderController
        });

    DpDataSelectionHeaderController.$inject = ['$scope', 'DATA_SELECTION_CONFIG'];

    function DpDataSelectionHeaderController ($scope, DATA_SELECTION_CONFIG) {
        let vm = this;

        $scope.$watchGroup(['vm.state.dataset', 'vm.state.view', 'vm.isLoading'], setHeader);

        function setHeader () {
            vm.title = DATA_SELECTION_CONFIG[vm.state.dataset].TITLE;

            vm.tabs = ['bag', 'hr'].map(dataset => {
                return {
                    dataset: dataset,
                    title: DATA_SELECTION_CONFIG[dataset].TITLE,
                    isActive: vm.state.dataset === dataset
                };
            });

            vm.showHeader = vm.state.view === 'LIST' || !vm.isLoading;
        }
    }
})();
