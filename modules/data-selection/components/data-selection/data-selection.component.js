import {
    SHOW_DATA_SELECTION} from '../../../../src/shared/ducks/new-data-selection/new-data-selection';
import DATA_SELECTION_CONFIG
    from '../../../../src/shared/services/data-selection/data-selection-config';
import {
    getMarkers,
    query
} from '../../../../src/shared/services/data-selection/data-selection-api';
import {
    RESET_DATA_SELECTION,
    VIEWS
} from '../../../../src/shared/ducks/new-data-selection/new-data-selection';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelection', {
            templateUrl: 'modules/data-selection/components/data-selection/data-selection.html',
            bindings: {
                boundingBox: '<',
                catalogFilters: '<',
                filters: '<',
                state: '<',
                user: '<',
                zoomLevel: '<',
                view: '<',
                dataset: '<',
                query: '<'
            },
            controller: DpDataSelectionController,
            controllerAs: 'vm'
        });

    DpDataSelectionController.$inject = [
        '$scope',
        'userSettings',
        'TabHeader',
        'store'
    ];

    function DpDataSelectionController (
        $scope,
        userSettings,
        TabHeader,
        store
    ) {
        const vm = this;

        vm.showCatalogusIntroduction = vm.view === VIEWS.CATALOG &&
            userSettings.showCatalogusIntroduction.value === true.toString();

        $scope.$watch('vm.showCatalogusIntroduction', function () {
            userSettings.showCatalogusIntroduction.value = vm.showCatalogusIntroduction.toString();
        });

        $scope.$watchGroup([
            // Watching all state variables except markers and isLoading
            'vm.boundingBox',
            'vm.catalogFilters',
            'vm.filters',
            'vm.dataset',
            'vm.view',
            'vm.state.geometryFilter',
            'vm.state.page',
            'vm.query',
            'vm.user.scopes',
            'vm.zoomLevel'
        ], fetchData);

        vm.tabHeader = new TabHeader('data-datasets');
        vm.tabHeader.activeTab = vm.tabHeader.getTab('datasets');

        function updateTabHeader (tabQuery, count) {
            if (vm.showTabHeader()) {
                vm.tabHeader.userScopes = vm.user.scopes;
                vm.tabHeader.query = tabQuery;
                vm.tabHeader.getTab('datasets').count = count;
            }
        }

        function fetchData () {
            const config = DATA_SELECTION_CONFIG.datasets[vm.dataset];
            const isListView = vm.view === VIEWS.LIST;

            const isQueryView = angular.isDefined(vm.query) && vm.query.trim().length >= 1;

            vm.showTabHeader = () => (vm.view === VIEWS.CATALOG) && isQueryView;
            vm.currentPage = vm.state.page;

            vm.numberOfRecords = null;
            vm.numberOfPages = null;

            vm.showContent = false;
            vm.disabled = false;

            if (config.AUTH_SCOPE && !vm.user.scopes.includes(config.AUTH_SCOPE)) {
                vm.disabled = true;
                vm.notAuthorizedMessageSrc =
                    `modules/data-selection/components/data-selection/not-authorized-message/${vm.dataset}.html`;
                vm.availableFilters = [];
                store.dispatch({
                    type: SHOW_DATA_SELECTION,
                    payload: []
                });
                return;
            }

            vm.isLoading = true;

            query(
                vm.dataset,
                vm.view,
                vm.filters,
                vm.currentPage,
                vm.query,
                vm.state.geometryFilter.markers,
                vm.catalogFilters
            ).then(data => {
                vm.availableFilters = data.filters;
                vm.data = data.data;
                vm.numberOfRecords = data.numberOfRecords;
                vm.numberOfPages = data.numberOfPages;

                vm.showFilters = !isListView && vm.numberOfRecords > 0;

                // determine if warning messages should be shown
                vm.maxAvailablePages = DATA_SELECTION_CONFIG.datasets[vm.dataset].MAX_AVAILABLE_PAGES;
                vm.showMessageMaxPages = vm.maxAvailablePages && vm.state.page > vm.maxAvailablePages;

                vm.maxNumberOfClusteredMarkers =
                    DATA_SELECTION_CONFIG.datasets[vm.dataset].MAX_NUMBER_OF_CLUSTERED_MARKERS;
                vm.showMessageClusteredMarkers = isListView && vm.numberOfRecords > vm.maxNumberOfClusteredMarkers;

                updateTabHeader(vm.state.query, vm.numberOfRecords);

                vm.showContent =
                    vm.numberOfRecords &&
                    (
                        angular.isUndefined(vm.maxAvailablePages) ||
                        angular.isUndefined(vm.state.page) ||
                        vm.state.page <= vm.maxAvailablePages // TODO refactor, get page through query parameter
                    );

                const activeFilters = angular.extend({
                    shape: angular.toJson(vm.state.geometryFilter.markers.map(([lat, lng]) => [lng, lat]))
                }, vm.filters);

                if (isListView && vm.numberOfRecords <= vm.maxNumberOfClusteredMarkers) {
                    // Get marker data and update the state to show the
                    // data
                    getMarkers(vm.dataset, activeFilters, vm.zoomLevel, vm.boundingBox)
                        .then(markerData => {
                            store.dispatch({
                                type: SHOW_DATA_SELECTION,
                                payload: markerData
                            });
                        });
                } else if (vm.state.reset) {
                    // Update the state to show the data, do not trigger a
                    // url state change however
                    store.dispatch({
                        type: RESET_DATA_SELECTION,
                        payload: []
                    });
                } else {
                    // Update the state to show the data
                    store.dispatch({
                        type: SHOW_DATA_SELECTION,
                        payload: []
                    });
                }
            }).finally(() => {
                vm.isLoading = false;
            });
        }
    }
})();
