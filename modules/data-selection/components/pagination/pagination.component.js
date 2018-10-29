import {
    fetchDataSelection,
    getDataSelection
} from '../../../../src/shared/ducks/data-selection/data-selection';
import { toAddress } from '../../../../src/app/routes';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionPagination', {
            bindings: {
                currentPage: '<',
                numberOfPages: '<'
            },
            templateUrl: 'modules/data-selection/components/pagination/pagination.html',
            controller: DpDataSelectionPaginationController,
            controllerAs: 'vm'
        });

    DpDataSelectionPaginationController.$inject = ['store'];

    function DpDataSelectionPaginationController (store) {
        const vm = this;

        vm.$onChanges = function () {
            const isFirstPage = vm.currentPage === 1;
            const isLastPage = vm.currentPage === vm.numberOfPages;

            vm.showPagination = vm.numberOfPages > 1;

            if (vm.showPagination) {
                vm.firstPage = {
                    label: 'Eerste',
                    class_name: 'c-data-selection-pagination-link--first',
                    action: toAddress({
                        query: { page: 1 }
                    }),
                    enabled: !isFirstPage
                };

                vm.previousPage = {
                    label: 'Vorige',
                    class_name: 'c-data-selection-pagination-link--previous',
                    action: toAddress({
                        query: { page: isFirstPage ? null : vm.currentPage - 1 }
                    }),
                    enabled: !isFirstPage
                };

                vm.nextPage = {
                    label: 'Volgende',
                    class_name: 'c-data-selection-pagination-link--next',
                    action: toAddress({
                        query: { page: isLastPage ? null : vm.currentPage + 1 }
                    }),
                    enabled: !isLastPage
                };

                vm.lastPage = {
                    label: 'Laatste',
                    class_name: 'c-data-selection-pagination-link--last',
                    action: toAddress({
                        query: { page: vm.numberOfPages }
                    }),
                    enabled: !isLastPage
                };
            }
        };

        vm.goToPage = function (event) {
            event.preventDefault();

            if (angular.isNumber(vm.currentPage) && vm.currentPage >= 1 && vm.currentPage <= vm.numberOfPages) {
                store.dispatch(toAddress({
                    ...getDataSelection(store.getState()),
                    page: vm.currentPage
                }));
            }
        };

        if (vm.currentPage > vm.numberOfPages) {
            store.dispatch(fetchDataSelection({
                ...getDataSelection(store.getState()),
                page: 1
            }));
        }
    }
})();
