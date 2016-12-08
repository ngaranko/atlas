(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpDataSelectionFilters', {
            bindings: {
                dataset: '@',
                availableFilters: '=',
                activeFilters: '=',
                isLoading: '='
            },
            templateUrl: 'modules/data-selection/components/filters/filters.html',
            controller: DpDataSelectionFilterController,
            controllerAs: 'vm'
        });

    DpDataSelectionFilterController.$inject = ['$scope', 'store', 'ACTIONS', 'dataSelectionConfig'];

    function DpDataSelectionFilterController ($scope, store, ACTIONS, dataSelectionConfig) {
        var vm = this,
            expandedCategories = [];

        $scope.$watchGroup(['vm.dataset', 'vm.activeFilters'], updateFilters, true);

        vm.showMoreThreshold = 10;

        vm.hasSelectableValues = function (category) {
            var nValues = 0;
            angular.forEach(category.options, function (option) {
                nValues += vm.isFilterActive(category.slug, option.label) ? 0 : 1;
            });
            return nValues > 0;
        };

        vm.isFilterActive = function (categorySlug, filterLabel) {
            return vm.activeFilters[categorySlug] === filterLabel;
        };

        vm.addFilter = function (categorySlug, filterLabel) {
            var filters = angular.copy(vm.activeFilters);

            filters[categorySlug] = filterLabel;

            applyFilters(filters);
        };

        vm.removeFilter = function (categorySlug) {
            var filters = angular.copy(vm.activeFilters);

            delete filters[categorySlug];

            applyFilters(filters);
        };

        vm.showExpandButton = function (categorySlug) {
            var numberOfOptions;

            numberOfOptions = vm.availableFilters.filter(function (availableFilter) {
                return availableFilter.slug === categorySlug;
            })[0].options.length;

            return !vm.isExpandedCategory(categorySlug) && numberOfOptions > vm.showMoreThreshold;
        };

        vm.nrHiddenOptions = function (category) {
            return category.numberOfOptions - category.options.length;
        };

        vm.expandCategory = function (categorySlug) {
            expandedCategories.push(categorySlug);
        };

        vm.implodeCategory = function (categorySlug) {
            var index = expandedCategories.indexOf(categorySlug);
            if (index >= 0) {
                expandedCategories.splice(index, 1);
            }
        };

        vm.isExpandedCategory = function (categorySlug) {
            return expandedCategories.indexOf(categorySlug) !== -1;
        };

        function updateFilters () {
            vm.showOptionCounts = dataSelectionConfig[vm.dataset].SHOW_FILTER_OPTION_COUNTS;

            vm.formattedActiveFilters = dataSelectionConfig[vm.dataset].FILTERS.filter(category => {
                return angular.isString(vm.activeFilters[category.slug]);
            }).map(function (category) {
                const option = vm.availableFilters.filter(availableFilter => {
                    return availableFilter.slug === category.slug;
                })[0].options.filter(opt => {
                    return opt.id === vm.activeFilters[category.slug];
                })[0];

                return {
                    category,
                    option
                };
            });
        }

        function applyFilters (filters) {
            store.dispatch({
                type: ACTIONS.FETCH_DATA_SELECTION,
                payload: {
                    dataset: vm.dataset,
                    filters: filters,
                    page: 1
                }
            });
        }
    }
})();
