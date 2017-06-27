(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLinkToHelp', {
            templateUrl: 'modules/shared/components/link-to-help/link-to-help.html',
            transclude: true,
            bindings: {},
            controllerAs: 'vm'
        });
})();
