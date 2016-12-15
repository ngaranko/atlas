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

    DpWkpbLinkController.$inject = ['API_CONFIG'];

    function DpWkpbLinkController (API_CONFIG) {
        var vm = this;

        vm.wkpbEndpoint = API_CONFIG.ROOT + 'brk/object-wkpb/' + vm.brkId + '/';
    }
})();
