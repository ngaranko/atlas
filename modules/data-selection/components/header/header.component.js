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

    DpDataSelectionHeaderController.$inject = ['$scope', 'dataSelectionConfig', 'user'];

    function DpDataSelectionHeaderController ($scope, dataSelectionConfig, user) {
        const vm = this;

        $scope.$watchGroup([
            'vm.state.dataset',
            'vm.state.view',
            'vm.numberOfRecords'
        ], setHeader);

        function setHeader () {
            const isListView = vm.state.view === 'LIST';
            const config = dataSelectionConfig.datasets[vm.state.dataset];
            const exportAuthLevel = config.AUTH_LEVEL_EXPORT;

            vm.showButtons = vm.state.dataset !== 'catalogus';
            vm.showDownloadButton = vm.state.view !== 'LIST' &&
                vm.numberOfRecords > 0 &&
                (!exportAuthLevel || user.meetsRequiredLevel(exportAuthLevel));
            vm.showTabs = isListView;
            vm.showNoResultsFound = vm.numberOfRecords === 0;
            vm.showActiveFilters = Object.keys(vm.state.filters).length || vm.state.geometryFilter.markers.length;

            vm.datasetTitle = dataSelectionConfig.datasets[vm.state.dataset].TITLE;

            vm.tabs = ['bag', 'hr'].map(dataset => {
                return {
                    dataset: dataset,
                    title: dataSelectionConfig.datasets[dataset].TITLE,
                    isActive: vm.state.dataset === dataset
                };
            });
        }
    }
})();
