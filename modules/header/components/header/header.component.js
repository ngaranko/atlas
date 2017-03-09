(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpHeader', {
            bindings: {
                query: '@',
                hasPrintButton: '<',
                isTall: '='
            },
            templateUrl: 'modules/header/components/header/header.html',
            controllerAs: 'vm'
        });
})();
