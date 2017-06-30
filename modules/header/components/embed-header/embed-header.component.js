(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpEmbedHeader', {
            controller: DpEmbedHeader,
            templateUrl: 'modules/header/components/embed-header/embed-header.html',
            controllerAs: 'vm'
        });

    DpEmbedHeader.$inject = ['store', 'embed'];

    function DpEmbedHeader (store, embed) {
        const vm = this;

        store.subscribe(update);
        update();

        function update () {
            const ghostState = angular.copy(store.getState());

            ghostState.atlas.isEmbedPreview = false;

            vm.link = embed.getLink(ghostState);
            vm.html = embed.getHtml(ghostState);
        }
    }
})();
