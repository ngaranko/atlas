import { FETCH_SEARCH_RESULTS_BY_QUERY } from '../../../src/shared/ducks/data-search/data-search';
import { FETCH_DATA_SELECTION } from '../../../src/header/ducks/search/search';
import { getDataSelection } from '../../../src/shared/ducks/data-selection/data-selection';
import { isMapPage } from '../../../src/store/redux-first-router';

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
            const state = store.getState(),
                isDataSelection = angular.isObject(getDataSelection(state)),
                isListView = isDataSelection && getDataSelection(state).view === 'LIST',
                isCatalogView = isDataSelection && getDataSelection(state).view === 'CATALOG',
                isHomepage = angular.isObject(state.page) && state.page.name === 'home' &&
                    !isMapPage(state) &&
                    !angular.isObject(state.straatbeeld);

            if (isCatalogView) {
                // Search in datasets
                vm.query = state.dataSelection && state.dataSelection.query;
                vm.searchAction = FETCH_DATA_SELECTION;
            } else {
                // Default action is to search in data
                vm.query = state.search && state.search.query;
                vm.searchAction = FETCH_SEARCH_RESULTS_BY_QUERY;
            }

            vm.hasPrintButton = (!isDataSelection || isListView) && !isHomepage;
            vm.hasEmbedButton = isMapPage(state);
        }
    }
})();
