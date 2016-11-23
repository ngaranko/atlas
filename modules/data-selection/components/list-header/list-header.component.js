(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionListHeader', {
            bindings: {
                state: '=',
                numberOfRecords: '=',
                headerTitle: '<'
            },
            templateUrl: 'modules/data-selection/components/list-header/list-header.html',
            controller: DpDataSelectionListHeader,
            controllerAs: 'vm'
        });

    DpDataSelectionListHeader.$inject = ['$scope', 'dataSelectionConfig', 'dataSelectionConstants'];

    function DpDataSelectionListHeader ($scope, dataSelectionConfig, dataSelectionConstants) {
        var vm = this;

        vm.tableView = dataSelectionConstants.VIEW_TABLE;

        $scope.$watch('vm.state.filters', updateFilters, true);

        function updateFilters () {
            vm.formattedActiveFilters = dataSelectionConfig[vm.state.dataset].FILTERS.filter(function (filter) {
                return angular.isString(vm.state.filters[filter.slug]);
            }).map(function (filter) {
                return {
                    categorySlug: filter.slug,
                    categoryLabel: filter.label,
                    format: filter.format,
                    option: vm.state.filters[filter.slug]
                };
            });
        }
    }
})();
