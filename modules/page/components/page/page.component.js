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
            controllerAs: 'vm'
        });
})();
