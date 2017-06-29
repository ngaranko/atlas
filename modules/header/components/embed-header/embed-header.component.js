(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpEmbedHeader', {
            controller: DpEmbedHeader,
            templateUrl: 'modules/header/components/embed-header/embed-header.html',
            controllerAs: 'vm'
        });

    function DpEmbedHeader () {
        const vm = this;

        vm.link = '123';
        vm.html = 'abc';
    }
})();
