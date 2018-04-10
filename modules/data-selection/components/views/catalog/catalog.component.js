(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionCatalog', {
            bindings: {
                content: '<'
            },
            controller: DpDataSelectionCatalogController,
            templateUrl: 'modules/data-selection/components/views/catalog/catalog.html',
            controllerAs: 'vm'
        });

    DpDataSelectionCatalogController.$inject = ['store', 'ACTIONS'];

    function DpDataSelectionCatalogController (store, ACTIONS) {
        const vm = this;

        var state = store.getState();
        vm.catalogFilters = state.catalogFilters;

        vm.fetch_detail = function (endpoint) {
            store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: endpoint
            });
        };

        vm.items = getViewModel(vm.content);

        function getViewModel (content) {
            var result = content.map((item, index) => {
                var ret = {};
                ret.header = item['dct:title'];
                ret.description = item['dct:description'];
                ret.modification = { 'metadata_created': '2018-01-01', 'metadata_modified': '2018-03-01' };
                ret.formats = item['dcat:distribution'].map(resource => resource['dct:format']);
                ret.tags = item['dcat:keyword'];
                ret.detailEndpoint = item._links.self.href;
                return ret;
            });
            return result;
        }
    }
})();
