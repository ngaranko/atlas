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

        $scope.$watchGroup([
            'vm.state.dataset',
            'vm.state.view',
            'vm.numberOfRecords',
            'vm.isLoading'
        ], setHeader);

        function setHeader () {
            vm.showHeader = vm.state.view === 'LIST' || !vm.isLoading;
            vm.showButtons = vm.state.dataset !== 'catalogus';
            vm.showTabs = vm.state.view === 'LIST';
            vm.showNoResultsFound = vm.numberOfRecords === 0 && !vm.isLoading;

            vm.showMessageMaxPages = DATA_SELECTION_CONFIG.datasets[vm.state.dataset].MAX_AVAILABLE_PAGES &&
                vm.state.page > DATA_SELECTION_CONFIG.datasets[vm.state.dataset].MAX_AVAILABLE_PAGES;

            vm.showMessageClusteredMarkers = vm.state.view === 'LIST' &&
                !vm.isLoading && vm.numberOfRecords > DATA_SELECTION_CONFIG.options.MAX_NUMBER_OF_CLUSTERED_MARKERS;

            vm.datasetTitle = DATA_SELECTION_CONFIG.datasets[vm.state.dataset].TITLE;

            vm.tabs = ['bag', 'hr'].map(dataset => {
                return {
                    dataset: dataset,
                    title: DATA_SELECTION_CONFIG.datasets[dataset].TITLE,
                    isActive: vm.state.dataset === dataset
                };
            });
        }
    }
})();
