(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionHeader', {
            bindings: {
                state: '<',
                availableFilters: '<',
                numberOfRecords: '<',
                showHeader: '<'
            },
            templateUrl: 'modules/data-selection/components/header/header.html',
            controllerAs: 'vm',
            controller: DpDataSelectionHeaderController
        });

    DpDataSelectionHeaderController.$inject = ['$scope', 'DATA_SELECTION_CONFIG'];

    function DpDataSelectionHeaderController ($scope, DATA_SELECTION_CONFIG) {
        const vm = this;

        $scope.$watchGroup([
            'vm.state.dataset',
            'vm.state.view',
            'vm.numberOfRecords'
        ], setHeader);

        function setHeader () {
            const isListView = vm.state.view === 'LIST';

            vm.showButtons = vm.state.dataset !== 'catalogus';
            vm.showTitle = isListView || vm.numberOfRecords;
            vm.showSearchQuery = angular.isString(vm.state.query);
            vm.showTabs = isListView;
            vm.showNoResultsFound = vm.numberOfRecords === 0;
            vm.showActiveFilters = Object.keys(vm.state.filters).length || vm.state.geometryFilter.markers.length;

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
