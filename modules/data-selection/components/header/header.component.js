(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionHeader', {
            bindings: {
                state: '=',
                numberOfRecords: '=',
                headerTitle: '<'
            },
            templateUrl: 'modules/data-selection/components/header/header.html',
            controllerAs: 'vm',
            controller: DpDataSelectionHeaderController
        });

    DpDataSelectionHeaderController.$inject = ['DATA_SELECTION_CONFIG'];

    function DpDataSelectionHeaderController (DATA_SELECTION_CONFIG) {
        let vm = this;

        vm.tabs = ['bag', 'hr'].map(dataset => {
            return {
                dataset: dataset,
                title: DATA_SELECTION_CONFIG[dataset].TITLE,
                isActive: vm.state.dataset === dataset
            };
        });
    }
})();
