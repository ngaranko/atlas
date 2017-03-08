(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpLogo', {
            bindings: {
                isTall: '='
            },
            templateUrl: 'modules/header/components/logo/logo.html',
            controllerAs: 'vm'
        });
})();
