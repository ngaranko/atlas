(() => {
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
        vm.showMoreThreshold = 10;
        vm.filterSlug = 'sbi_code';

        vm.filter = {
            ...vm.availableFilters.find(filter => filter.slug === 'sbi_code'),
            options,
            numberOfOptions
        };

        vm.onSubmit = () => {
            vm.addFilter(vm.sbiCode);
        };

        vm.addFilter = (string) => {
            const filters = {...vm.activeFilters};

            if (string === '') {
                delete filters[vm.filterSlug];
            } else {
                filters[vm.filterSlug] =
                    '[' + string.split(',').map(data => '\'' + data.trim() + '\'').join(', ') + ']';
            }

            applyFilters(filters);
        };

        vm.clickFilter = (string) => {
            vm.addFilter(string.replace(/-.*$/g, ''));
        };

        vm.showExpandButton = function () {
            return !vm.isExpandedFilter() && vm.canExpandImplode();
        };

        vm.nrHiddenOptions = function (filter) {
            return filter.numberOfOptions - filter.options.length;
        };

        vm.expandFilter = function () {
            expandedFilters.push(vm.filterSlug);
        };

        vm.implodeFilter = function () {
            var index = expandedFilters.indexOf(vm.filterSlug);
            if (index >= 0) {
                expandedFilters.splice(index, 1);
            }
        };

        vm.isExpandedFilter = function () {
            return expandedFilters.indexOf(vm.filterSlug) !== -1 && vm.canExpandImplode();
        };

        vm.canExpandImplode = function () {
            return vm.filter.options.length > vm.showMoreThreshold;
        };

        function applyFilters (filters) {
            store.dispatch({
                type: ACTIONS.APPLY_FILTERS,
                payload: filters
            });
        }
    }
})();
