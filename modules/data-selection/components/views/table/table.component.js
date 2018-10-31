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
            controllerAs: 'vm'
        });
})();
