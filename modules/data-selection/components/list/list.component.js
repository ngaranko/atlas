(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionList', {
            templateUrl: 'modules/data-selection/components/list/list.html',
            bindings: {
                data: '='
            },
            controller: DpDataSelectionListController,
            controllerAs: 'vm'
        });

    DpDataSelectionListController.$inject = ['$scope', 'dataSelectionApi', 'dataSelectionConfig'];

    function DpDataSelectionListController ($scope, dataSelectionApi, dataSelectionConfig) {
        let vm = this;
    }
})();
