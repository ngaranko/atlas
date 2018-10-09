import removeMd from 'remove-markdown';
import { fetchDetail } from '../../../../../src/reducers/details';
import { routing } from '../../../../../src/app/routes';

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

        const formatMap = arrayToObject(vm.catalogFilters.formatTypes, 'id');
        const serviceMap = arrayToObject(vm.catalogFilters.serviceTypes, 'id');
        const distributionMap = arrayToObject(vm.catalogFilters.distributionTypes, 'id');

        vm.items = vm.content.map((item, index) => {
            const formats = item['dcat:distribution'].map(resource => {
                if (resource['ams:distributionType'] === 'file') {
                    return formatMap[resource['dct:format']];
                } else if (resource['ams:distributionType'] === 'api') {
                    return serviceMap[resource['ams:serviceType']];
                } else {
                    return distributionMap[resource['ams:distributionType']];
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
                id: item['dct:identifier'],
                detailEndpoint: item._links.self.href
            };
        });

        vm.openDetail = (endPoint, id) => {
            store.dispatch(fetchDetail(endPoint));
            store.dispatch({ type: routing.catalogusDetail.type, payload: { id } });
        };

        sessionStorage.setItem('DCATD_LIST_REDIRECT_URL', document.location.href);
    }

    function arrayToObject (array, keyField) {
        return array.reduce((obj, item) => {
            obj[item[keyField]] = item.label;
            return obj;
        }, {});
    }
}) ();
