import removeMd from 'remove-markdown';

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

    DpDataSelectionCatalogController.$inject = ['store', 'ACTIONS', '$filter'];

    function DpDataSelectionCatalogController (store, ACTIONS, $filter) {
        const vm = this;

        var state = store.getState();
        vm.catalogFilters = state.catalogFilters;

        vm.items = vm.content.map((item, index) => {
            return {
                header: item['dct:title'],
                description: removeMd(item['dct:description']),
                modification: {
                    'metadata_created': item['foaf:isPrimaryTopicOf']['dct:issued'],
                    'metadata_modified': item['foaf:isPrimaryTopicOf']['dct:modified']
                },
                formats: $filter('aggregate')(item['dcat:distribution'].map(resource => resource['dct:format'])),
                tags: item['dcat:keyword'],
                detailEndpoint: item._links.self.href
            };
        });

        sessionStorage.setItem('DCATD_LIST_REDIRECT_URL', document.location.href);
    }
}) ();
