(() => {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpEmbedHeader', {
            controller: DpEmbedHeader,
            templateUrl: 'modules/header/components/embed-header/embed-header.html',
            controllerAs: 'vm'
        });

    DpEmbedHeader.$inject = ['$window'];

    function DpEmbedHeader ($window) {
        const vm = this;

        vm.link = $window.location.href;
        vm.html = `<iframe width="500" height="400" src="${vm.link}" frameborder="0"></iframe>`;
    }
})();
