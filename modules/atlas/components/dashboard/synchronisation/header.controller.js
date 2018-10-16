import { isMapCurrentPage } from '../../../../../src/shared/ducks/current-page/current-page-reducer';
import { FETCH_SEARCH_RESULTS_BY_QUERY } from '../../../../../src/shared/ducks/search/search';

(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['store', 'ACTIONS'];

    function HeaderController (store, ACTIONS) {
        const vm = this;

        store.subscribe(update);
        update();

        function update () {
            const state = store.getState(),
                isDataSelection = angular.isObject(state.dataSelection),
                isListView = isDataSelection && state.dataSelection.view === 'LIST',
                isCatalogView = isDataSelection && state.dataSelection.view === 'CATALOG',
                isHomepage = angular.isObject(state.page) && state.page.name === 'home' &&
                    !isMapCurrentPage(state) &&
                    !angular.isObject(state.straatbeeld);

            if (isCatalogView) {
                // Search in datasets
                vm.query = state.dataSelection && state.dataSelection.query;
                vm.searchAction = ACTIONS.FETCH_DATA_SELECTION;
            } else {
                // Default action is to search in data
                vm.query = state.search && state.search.query;
                vm.searchAction = FETCH_SEARCH_RESULTS_BY_QUERY;
            }

            vm.hasPrintButton = (!isDataSelection || isListView) && !isHomepage;
            vm.hasEmbedButton = isMapCurrentPage(state);
        }
    }
})();
