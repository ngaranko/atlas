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

    DpAnchorLinkController.$inject = ['$scope', '$anchorScroll'];

    function DpAnchorLinkController ($scope, $anchorScroll) {
        let vm = this;

        vm.scrollTo = function (anchor) {
            $anchorScroll(anchor);
        };

        if (vm.autoScroll) {
            $scope.$applyAsync(() => {
                vm.scrollTo(vm.link)
            });
        }
    }
})();
