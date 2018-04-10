(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionCatalog', {
            bindings: {
                content: '<',
                catalogFilters: '<'
            },
            controller: DpDataSelectionCatalogController,
            templateUrl: 'modules/data-selection/components/views/catalog/catalog.html',
            controllerAs: 'vm'
        });

    DpDataSelectionCatalogController.$inject = ['store', 'ACTIONS'];

    function DpDataSelectionCatalogController (store, ACTIONS) {
        const vm = this;

        vm.fetch_detail = function (endpoint) {
            store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: endpoint
            });
        };
    }
})();
