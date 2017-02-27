(function () {
    'use strict';

    angular
        .module('dpDetail')
        .component('dpWkpbLink', {
            bindings: {
                brkId: '@'
            },
            templateUrl: 'modules/detail/components/wkpb-link/wkpb-link.html',
            controller: DpWkpbLinkController,
            controllerAs: 'vm'
        });

    DpWkpbLinkController.$inject = ['apiConfig'];

    function DpWkpbLinkController (apiConfig) {
        let vm = this;

        vm.wkpbEndpoint = apiConfig.ROOT + 'brk/object-wkpb/' + vm.brkId + '/';
    }
})();
