import { features } from '../../../../src/shared/environment';
import {
    fetchDataSelection
} from '../../../../src/shared/ducks/data-selection/actions';
import { DATASETS } from '../../../../src/shared/ducks/data-selection/constants';

(function () {
    'use strict';

    angular
        .module('dpDetail')
        .component('dpDataSelectionLinks', {
            bindings: {
                activeFilters: '='
            },
            templateUrl: 'modules/detail/components/data-selection-links/data-selection-links.html',
            controller: DpDataSelectionLinksController,
            controllerAs: 'vm'
        });

    function DpDataSelectionLinksController () {
        var vm = this;
        vm.eigendommen = features.eigendommen;

        const defaultActionPayload = (dataset) => ({
            dataset,
            activeFilters: vm.activeFilters,
            page: 1
        });

        vm.getBRK = fetchDataSelection({
            ...defaultActionPayload(DATASETS.BRK)
        });

        vm.getHR = fetchDataSelection({
            ...defaultActionPayload(DATASETS.HR)
        });

        vm.getBAG = fetchDataSelection({
            ...defaultActionPayload(DATASETS.BAG)
        });
    }
})();
