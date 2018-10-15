(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpHeader', {
            templateUrl: 'modules/header/components/header/header.html',
            controller: DpHeaderController,
            controllerAs: 'vm',
            bindings: {
                isHomePage: '<',
                hasMaxWidth: '<',
                isEmbed: '<',
                isPrintMode: '<',
                isEmbedPreview: '<',
                user: '<',
                isPrintOrEmbedOrPreview: '<'
            }
        });

    function DpHeaderController (HEADER) {
        const vm = this;

        vm.headerSize = vm.isHomePage ? HEADER.SIZE.TALL : HEADER.SIZE.SHORT;
    }

    DpHeaderController.$inject = ['HEADER'];
})();
