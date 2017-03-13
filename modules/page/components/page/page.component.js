(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpPage', {
            bindings: {
                name: '@',
                type: '@',
                item: '@'
            },
            templateUrl: 'modules/page/components/page/page.html',
            controller: DpPageComponent,
            controllerAs: 'vm'
        });

    DpPageComponent.inject = ['$scope', 'googleSheet', 'GOOGLE_SHEET_CMS'];

    function DpPageComponent ($scope, googleSheet, GOOGLE_SHEET_CMS) {
        let vm = this;

        vm.feed = null;
        vm.entries = [];
        vm.entry = null;

        $scope.$watchGroup(['vm.type', 'vm.item'], () => {
            if (vm.type) {
                vm.feed = null;
                vm.entries = [];
                vm.entry = null;
                googleSheet.getContents(GOOGLE_SHEET_CMS.key, GOOGLE_SHEET_CMS.index[vm.type])
                    .then(contents => {
                        vm.feed = contents.feed;
                        vm.entries = contents.entries;
                        vm.entry = vm.entries.reduce((result, entry) => entry.id === vm.item ? entry : result, null);
                    });
            }
        });
    }
})();
