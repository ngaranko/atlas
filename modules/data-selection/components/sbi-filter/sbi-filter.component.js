(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpSbiFilter', {
            bindings: {
                availableFilters: '=',
                activeFilters: '='
            },
            templateUrl: 'modules/data-selection/components/sbi-filter/sbi-filter.html',
            controller: DpSbiFilterController,
            controllerAs: 'vm'
        });

    DpSbiFilterController.$inject = ['$scope', 'store', 'ACTIONS', 'DATA_SELECTION_CONFIG'];

    function DpSbiFilterController ($scope, store, ACTIONS, DATA_SELECTION_CONFIG) {
        var vm = this,
            expandedFilters = [];

            vm.showOptionCounts = false;

        // $scope.$watch('vm.dataset', updateConfig, true);

        vm.showMoreThreshold = 10;
console.log('SBi filter', vm);
        // vm.hasInactiveFilterOptions = function (filter) {
            // return !filter.options.some(option => vm.isFilterOptionActive(filter.slug, option.id, option.label));
        // };

        // vm.isFilterOptionActive = function (filterSlug, id, label) {
            // return vm.activeFilters[filterSlug] === label || vm.activeFilters[filterSlug] === id;
        // };

        vm.addFilter = function (filterSlug, optionId) {
            var filters = {...vm.activeFilters};

            filters[filterSlug] = optionId;

            applyFilters(filters);
        };

        vm.onSubmit = () => {
            console.log('SUBMIT', `[${vm.sbiCode}]`);
             vm.addFilter('sbi_code', `[${vm.sbiCode}]`);
        };

        // vm.showExpandButton = function (filterSlug) {
            // return !vm.isExpandedFilter(filterSlug) && getAvailableOptions(filterSlug).length > vm.showMoreThreshold;
        // };

        // vm.nrHiddenOptions = function (filter) {
            // return filter.numberOfOptions - filter.options.length;
        // };

        // vm.expandFilter = function (filterSlug) {
            // expandedFilters.push(filterSlug);
        // };

        // vm.implodeFilter = function (filterSlug) {
            // var index = expandedFilters.indexOf(filterSlug);
            // if (index >= 0) {
                // expandedFilters.splice(index, 1);
            // }
        // };

        // vm.isExpandedFilter = function (filterSlug) {
            // return expandedFilters.indexOf(filterSlug) !== -1;
        // };

        // vm.canExpandImplode = function (filterSlug) {
            // return getAvailableOptions(filterSlug).length > vm.showMoreThreshold;
        // };

        // function getAvailableOptions (filterSlug) {
            // return getAvailableFilters(filterSlug)[0].options;
        // }

        // function getAvailableFilters (filterSlug) {
            // return vm.availableFilters.filter(filter => filter.slug === filterSlug);
        // }

        // function updateConfig () {
            // vm.showOptionCounts = DATA_SELECTION_CONFIG.datasets[vm.dataset].SHOW_FILTER_OPTION_COUNTS;
        // }

        function applyFilters (filters) {
            store.dispatch({
                type: ACTIONS.APPLY_FILTERS,
                payload: filters
            });
        }
    }
})();
