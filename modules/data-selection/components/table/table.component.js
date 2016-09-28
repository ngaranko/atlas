(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionTable', {
            bindings: {
                content: '='
            },
            templateUrl: 'modules/data-selection/components/table/table.html',
            controller: DpDataSelectionTableController,
            controllerAs: 'vm'
        });

    DpDataSelectionTableController.$inject = ['store', '$filter', 'ACTIONS'];

    function DpDataSelectionTableController (store, $filter, ACTIONS) {
        var vm = this;

        vm.classForField = function (format) {
            switch(format && format.align) {
                case 'right':
                    return 'data-selection__align__right';
                default:
                    return '';
            }
        };

        vm.fieldDisplayValue = function(rawValue, format) {
            var displayValue = rawValue;
            angular.forEach(format && format.filters, function (filter) {
                displayValue = $filter(filter)(displayValue);
            });
            return displayValue;
        };

        vm.followLink = function (endpoint) {
            store.dispatch({
                type: ACTIONS.FETCH_DETAIL,
                payload: endpoint
            });
        };
    }
})();
