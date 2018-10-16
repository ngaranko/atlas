import { routing } from '../../../../src/app/routes';
import { datasetsKey } from './tab-header.constant';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpTabHeader', {
            templateUrl: 'modules/shared/components/tab-header/tab-header.html',
            bindings: {
                searchText: '@',
                tabHeader: '<',
                filtersActive: '<'
            },
            controller: DpTabHeaderController,
            controllerAs: 'vm'
        });

    DpTabHeaderController.$inject = [];

    function DpTabHeaderController () {
        const vm = this;

        vm.tabs = vm.tabHeader.tabs.map((tab) => {
            const type = tab.id === datasetsKey ? routing.searchCatalog.type : routing.searchData.type;
            tab.linkTo = {
                type,
                payload: {
                    query: vm.searchText
                }
            };
            return tab;
        });

        // show the tabHeader when any searchText is set
        vm.show = () => vm.searchText.trim();

        // Should the reset button be visible
        vm.showReset = () => vm.searchText.trim() && vm.filtersActive;

        // sum of all tabCounts, null when any tab.count is null
        vm.totalCount = () => vm.tabHeader.tabs.reduce(
            (sum, tab) => sum === null || tab.count === null ? null : sum + tab.count, 0);

        // Return the active tab of the tabHeader
        vm.activeTab = vm.tabHeader.tabs.find(tab => tab.isActive);
    }
})();
