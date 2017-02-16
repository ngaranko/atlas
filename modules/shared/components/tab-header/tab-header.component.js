(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpTabHeader', {
            templateUrl: 'modules/shared/components/tab-header/tab-header.html',
            bindings: {
                title: '@',
                tabs: '<'
            },
            controller: DpTabHeaderComponent,
            controllerAs: 'vm'
        });

    DpTabHeaderComponent.inject = ['$scope', 'tabHeader'];

    function DpTabHeaderComponent ($scope, tabHeader) {
        let vm = this;

        vm.count = {};

        $scope.$watch('vm.tabs', () => {
            if (angular.isArray(vm.tabs)) {
                vm.tabs.forEach(tab => {
                    if (!tab.isActive && tabHeader.getCounter(tab.type)) {
                        tabHeader.getCounter(tab.type)(tab.payload).then(count => vm.count[tab.type] = count);
                    }
                });
            }
        }, true);
    }
})();
