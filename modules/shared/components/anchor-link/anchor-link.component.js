(function () {
    angular
        .module('dpShared')
        .run(['$anchorScroll', 'ANCHOR_LINK_SCROLL_OFFSET', ($anchorScroll, scrollOffset) => {
            $anchorScroll.yOffset = scrollOffset;   // always scroll by this amount of extra pixels
        }])
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
        const vm = this;

        vm.scrollTo = function (anchor) {
            $anchorScroll(anchor);
        };

        if (vm.autoScroll) {
            $scope.$applyAsync(() => {
                vm.scrollTo(vm.link);
            });
        }
    }
})();
