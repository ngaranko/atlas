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
            controllerAs: 'vm'
        });
})();
