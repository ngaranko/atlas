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

    DpSbiFilterController.$inject = ['$scope', 'store', 'ACTIONS'];

    function DpSbiFilterController ($scope, store, ACTIONS) {
        let numberOfOptions = 0;
        const vm = this,
            expandedFilters = [],
            options = vm.availableFilters
                .filter(filter => filter.slug.startsWith('sbi_l'))
                .map(filter => {
                    numberOfOptions += filter.numberOfOptions;
                    return filter.options.map(sub => {
                        sub.slug = filter.slug;
                        return sub;
                    });
                })
                .reduce((a, b) => a.concat(b))
                .slice(0, 100);

        vm.sbiCode = vm.activeFilters.sbi_code && vm.activeFilters.sbi_code.replace(/['\[\]]/g, '');
        vm.showOptionCounts = false;
        vm.showMoreThreshold = 10;

        vm.filter = {
            ...vm.availableFilters.find(filter => filter.slug === 'sbi_code'),
            options,
            numberOfOptions
        };

        vm.onSubmit = () => {
            vm.addFilter('sbi_code', vm.sbiCode);
        };

        vm.addFilter = (filterSlug, string) => {
            const filters = {...vm.activeFilters};

            if (string === '') {
                delete filters[filterSlug];
            } else {
                filters[filterSlug] = '[' + string.split(',').map(data => '\'' + data.trim() + '\'').join(', ') + ']';
            }

            applyFilters(filters);
        };

        vm.clickFilter = (filterSlug, string) => {
            vm.addFilter('sbi_code', string.replace(/-.*$/g, ''));
        };

        vm.showExpandButton = function (filterSlug) {
            return !vm.isExpandedFilter(filterSlug) && getAvailableOptions(filterSlug).length > vm.showMoreThreshold;
        };

        vm.nrHiddenOptions = function (filter) {
            return filter.numberOfOptions - filter.options.length;
        };

        vm.expandFilter = function (filterSlug) {
            expandedFilters.push(filterSlug);
        };

        vm.implodeFilter = function (filterSlug) {
            var index = expandedFilters.indexOf(filterSlug);
            if (index >= 0) {
                expandedFilters.splice(index, 1);
            }
        };

        vm.isExpandedFilter = function (filterSlug) {
            return expandedFilters.indexOf(filterSlug) !== -1;
        };

        vm.canExpandImplode = function (filterSlug) {
            return getAvailableOptions(filterSlug).length > vm.showMoreThreshold;
        };

        function getAvailableOptions (filterSlug) {
            return getAvailableFilters(filterSlug)[0].options;
        }

        function getAvailableFilters (filterSlug) {
            return vm.availableFilters.filter(filter => filter.slug === filterSlug);
        }

        function applyFilters (filters) {
            store.dispatch({
                type: ACTIONS.APPLY_FILTERS,
                payload: filters
            });
        }
    }
})();
