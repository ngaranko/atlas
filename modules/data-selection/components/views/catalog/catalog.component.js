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

    DpDataSelectionCatalogController.$inject = ['store', '$filter'];

    function DpDataSelectionCatalogController (store, $filter) {
        const vm = this;

        var state = store.getState();
        vm.catalogFilters = state.catalogFilters;

        const getFileType = function (mime, fieldSchema) {
            const filters = $filter('filter')(fieldSchema, {'id': mime});
            if (filters && filters.length > 0) {
                return filters[0].label;
            } else {
                return 'Anders';
            }
        };

        vm.items = vm.content.map((item, index) => {
            let formats = [];
            item['dcat:distribution'].map(resource => {
                if (resource['ams:distributionType'] === 'file') {
                    const format = getFileType(resource['dct:format'], vm.catalogFilters.formatTypes);
                    formats = [...formats, format];
                } else if (resource['ams:distributionType'] === 'api') {
                    const format = getFileType(resource['ams:serviceType'], vm.catalogFilters.serviceTypes);
                    formats = [...formats, format];
                } else {
                    const format = getFileType(resource['ams:distributionType'], vm.catalogFilters.distributionTypes);
                    formats = [...formats, format];
                }
            });

            return {
                header: item['dct:title'],
                description: removeMd(item['dct:description']),
                modification: {
                    'metadata_created': item['foaf:isPrimaryTopicOf']['dct:issued'],
                    'metadata_modified': item['foaf:isPrimaryTopicOf']['dct:modified']
                },
                formats: $filter('aggregate')(formats),
                tags: item['dcat:keyword'],
                detailEndpoint: item._links.self.href
            };
        });

        sessionStorage.setItem('DCATD_LIST_REDIRECT_URL', document.location.href);
    }
}) ();
