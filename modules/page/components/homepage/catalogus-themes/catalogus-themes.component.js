import { routing } from '../../../../../src/app/routes';
import { fetchDataSelection } from '../../../../../src/header/ducks/search/search';

(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpCatalogusThemes', {
            templateUrl: 'modules/page/components/homepage/catalogus-themes/catalogus-themes.html',
            controller: DpCatalogusThemes,
            controllerAs: 'vm'
        });

    DpCatalogusThemes.$inject = ['CATALOGUS_THEMES_CONFIG', 'store', 'ACTIONS'];

    function DpCatalogusThemes (CATALOGUS_THEMES_CONFIG, store, ACTIONS) {
        const vm = this;

        vm.onClick = (theme) => {
            store.dispatch({
                type: ACTIONS.APPLY_FILTERS,
                payload: {
                    groups: theme
                }
            });

            store.dispatch(fetchDataSelection({
                dataset: 'dcatd',
                view: 'CATALOG',
                page: 1
            }));

            store.dispatch({
                type: routing.catalogus.type
            });
        };

        vm.themes = angular.copy(CATALOGUS_THEMES_CONFIG);
        vm.themesPerColumn = Math.ceil(vm.themes.length / 2);
    }
})();
