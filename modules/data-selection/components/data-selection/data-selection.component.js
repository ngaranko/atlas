(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelection', {
            templateUrl: 'modules/data-selection/components/data-selection/data-selection.html',
            bindings: {
                state: '<'
            },
            controller: DpDataSelectionController,
            controllerAs: 'vm'
        });

    DpDataSelectionController.$inject = [
        '$scope',
        'userSettings',
        'dataSelectionApi',
        'DATA_SELECTION_CONFIG',
        'store',
        'ACTIONS'
    ];

    function DpDataSelectionController ($scope, userSettings, dataSelectionApi, DATA_SELECTION_CONFIG, store, ACTIONS) {
        let vm = this;
        const MAXIMUM_NUMBER_OF_MARKERS = 10000;

        vm.showCatalogusIntroduction = userSettings.showCatalogusIntroduction.value === true.toString();

        $scope.$watch('vm.showCatalogusIntroduction', function () {
            userSettings.showCatalogusIntroduction.value = vm.showCatalogusIntroduction.toString();
        });

        $scope.$watch(function () {
            // Watching all state variables except markers and isLoading
            return [
                vm.state.dataset,
                vm.state.view,
                vm.state.filters,
                vm.state.geometryFilters,
                vm.state.page,
                vm.state.query
            ];
        }, fetchData, true);

        function fetchData () {
            vm.isLoading = true;
            vm.title = DATA_SELECTION_CONFIG[vm.state.dataset].TITLE;
            vm.view = vm.state.view;
            vm.showFilters = vm.state.view !== 'LIST';
            vm.currentPage = vm.state.page;
            vm.isPageAvailable = !DATA_SELECTION_CONFIG.HAS_PAGE_LIMIT ||
                vm.currentPage <= DATA_SELECTION_CONFIG.MAX_AVAILABLE_PAGES;
            vm.hasTooManyMarkers = false;

            dataSelectionApi.query(vm.state.dataset,
                vm.state.view,
                vm.state.filters,
                vm.currentPage,
                vm.state.query,
                vm.state.geometryFilters).then(data => {
                    vm.availableFilters = data.filters;
                    vm.data = data.data;

                    vm.numberOfRecords = data.numberOfRecords;
                    vm.numberOfPages = data.numberOfPages;

                    vm.hasTooManyMarkers = vm.view === 'LIST' && vm.numberOfRecords > MAXIMUM_NUMBER_OF_MARKERS;
                    vm.isLoading = false;
                    let filterToUse = (typeof vm.state.geometryFilters !== 'undefined')
                        ? vm.state.geometryFilters : vm.state.filters;

                    console.log('FILTERTOUSE', filterToUse);

                    //filterToUse = "shape=[[4.895833999382631,52.37726209854141],[4.891800055383576,52.3761581382644],[4.897234940062647,52.37551638063261]]";
                    if (vm.view === 'LIST' && vm.numberOfRecords <= MAXIMUM_NUMBER_OF_MARKERS) {
                        dataSelectionApi.getMarkers(vm.state.dataset, filterToUse).then(markerData => {
                                store.dispatch({
                                    type: ACTIONS.SHOW_DATA_SELECTION,
                                    payload: markerData
                                });
                        });
                    } else {
                        store.dispatch({
                            type: ACTIONS.SHOW_DATA_SELECTION,
                            payload: []
                        });
                    }
                });
        }
    }
})();
