(function () {
    'use strict';

    angular
        .module('atlas')
        .component('dpDashboard', {
            templateUrl: 'modules/atlas/components/dashboard/dashboard.html',
            controller: DpDashboardController,
            controllerAs: 'vm'
        });

    DpDashboardController.$inject = ['$scope', 'store', 'dashboardColumns', '$location'];

    function DpDashboardController ($scope, store, dashboardColumns, $location) {
        let vm = this;

        vm.store = store;

        store.subscribe(setLayout);
        setLayout();

        $scope.$watch(() => dashboardColumns.determineVisibility(store.getState()).httpStatus, setLayout);

        function setLayout () {
            const state = store.getState();

            vm.activity = dashboardColumns.determineActivity(state);
            vm.visibility = dashboardColumns.determineVisibility(state);

            vm.isPrintMode = state.atlas.isPrintMode;

            vm.isCatalogus = (state.dataSelection && state.dataSelection.view === 'CARDS') ||
                (state.detail && state.detail.endpoint.includes('/catalogus/api/'));
            vm.dataSelectionState = state.dataSelection;

            vm.isRightColumnScrollable = !vm.isFullscreen &&
                (
                    vm.visibility.page ||
                    vm.visibility.detail ||
                    vm.visibility.searchResults ||
                    vm.visibility.dataSelection
                );

            vm.columnSizes = dashboardColumns.determineColumnSizes(state);

            // Needed for the dp-scrollable-content directive
            vm.pageName = state.page.name;

            // Am I in the process of gettng a response from SIAM? Check the URL for needed parameters
            console.log('hey, location and state', $location.search(), state)

        }
    }
})();
