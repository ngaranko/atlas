(function () {
    'use strict';

    angular
        .module('atlas')
        .component('dpDashboard', {
            templateUrl: 'modules/atlas/components/dashboard/dashboard.html',
            controller: DpDashboardController,
            controllerAs: 'vm'
        });

    DpDashboardController.$inject = ['$scope', 'store', 'dashboardColumns', 'HEADER'];

    function DpDashboardController ($scope, store, dashboardColumns, HEADER) {
        const vm = this;

        vm.store = store;

        store.subscribe(setLayout);
        setLayout();

        $scope.$watch(() => dashboardColumns.determineVisibility(store.getState()).httpStatus, setLayout);

        function setLayout () {
            const state = store.getState();

            vm.activity = dashboardColumns.determineActivity(state);
            vm.visibility = dashboardColumns.determineVisibility(state);

            vm.hasMaxWidth = vm.visibility.page;
            vm.isHomePage = vm.visibility.page && state.page && state.page.name === 'home';
            vm.headerSize = vm.isHomePage ? HEADER.SIZE.TALL : HEADER.SIZE.SHORT;

            vm.isPrintMode = state.atlas.isPrintMode;

            vm.dataSelectionState = state.dataSelection;

            vm.isRightColumnScrollable =
                vm.visibility.page ||
                vm.visibility.detail ||
                vm.visibility.searchResults ||
                vm.visibility.dataSelection;

            vm.columnSizes = dashboardColumns.determineColumnSizes(state);

            vm.isFullHeight = !vm.isRightColumnScrollable || vm.columnSizes.right < 12;
        }
    }
})();
