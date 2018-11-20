import { FETCH_SEARCH_RESULTS_BY_QUERY } from '../../../src/shared/ducks/data-search/data-search';
import {
    FETCH_DATA_SELECTION_REQUEST,
    isListView
} from '../../../src/shared/ducks/data-selection/data-selection';
import {
    isDataSelectionPage,
    isDatasetPage,
    isHomepage,
    isMapActive
} from '../../../src/store/redux-first-router';

(function () {
    'use strict';

    angular
        .module('atlas')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['store'];

    function HeaderController (store) {
        const vm = this;

        store.subscribe(update);
        update();

        function update () {
            const state = store.getState();

            if (isDatasetPage(state)) {
                // Search in datasets
                vm.query = state.dataSelection && state.dataSelection.query;
                vm.searchAction = FETCH_DATA_SELECTION_REQUEST;
            } else {
                // Default action is to search in data
                vm.query = state.search && state.search.query;
                vm.searchAction = FETCH_SEARCH_RESULTS_BY_QUERY;
            }

            vm.hasPrintButton = (!isDataSelectionPage(state) || isListView(state)) && !isHomepage(state);
            vm.hasEmbedButton = isMapActive(state);
        }
    }
})();
