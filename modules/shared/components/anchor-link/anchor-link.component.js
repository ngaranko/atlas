(function () {
    angular
        .module('dpShared')
        .component('dpAnchorLink', {
            bindings: {
                link: '@',
                className: '@'
            },
            transclude: true,
            templateUrl: 'modules/shared/components/anchor-link/anchor-link.html',
            controller: DpAnchorLinkController,
            controllerAs: 'vm'
        });

    DpAnchorLinkController.$inject = ['$anchorScroll'];

    function DpAnchorLinkController ($anchorScroll) {
        let vm = this;

        vm.scrollTo = function (anchor) {
            $anchorScroll(anchor);
        };
    }
})();
