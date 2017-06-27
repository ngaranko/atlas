(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLinkToHelp', {
            templateUrl: 'modules/shared/components/link-to-help/link-to-help.html',
            transclude: true,
            bindings: {
                type: '@',
                item: '@'
            },
            controller: dpLinkToHelpController,
            controllerAs: 'vm'
        });

    dpLinkToHelpController.$inject = ['$transclude'];

    function dpLinkToHelpController ($transclude) {
        const vm = this,
            label = $transclude().text();

        vm.payload = {
            name: 'content-overzicht',
            type: vm.type || 'snelwegwijs'
        };

        if (vm.item) {
            vm.payload.item = `item${vm.item}`;
        }

        vm.label = label || 'Help > Bediening > Inloggen';
    }
})();
