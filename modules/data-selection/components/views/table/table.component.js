import { getPageActionEndpoint } from '../../../../../src/app/routes';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionTable', {
            bindings: {
                content: '<',
                dataset: '<'
            },
            templateUrl: 'modules/data-selection/components/views/table/table.html',
            controller: DpDataSelectionTableController,
            controllerAs: 'vm'
        });

    function DpDataSelectionTableController () {
        const vm = this;

        vm.rows = vm.content.body.map(row => {
            const linkTo = getPageActionEndpoint(row.detailEndpoint);
            return {
                ...row,
                linkTo
            };
        });
    }
})();
