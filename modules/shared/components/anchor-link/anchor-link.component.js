(function () {
    angular
        .module('dpShared')
        .component('dpAnchorLink', {
            bindings: {
                link: '@',
                className: '@',
                autoScroll: '<'
            },
            transclude: true,
            templateUrl: 'modules/shared/components/anchor-link/anchor-link.html',
            controller: DpAnchorLinkController,
            controllerAs: 'vm'
        });

    DpAnchorLinkController.$inject = ['$scope', '$timeout', '$anchorScroll'];

    function DpAnchorLinkController ($scope, $timeout, $anchorScroll) {
        const vm = this;

        vm.scrollTo = function (anchor) {
            $timeout(() => {
                $anchorScroll(anchor);
            }, 150);
        };

        if (vm.autoScroll) {
            $scope.$applyAsync(() => {
                vm.scrollTo(vm.link);
            });
        }
    }
})();
