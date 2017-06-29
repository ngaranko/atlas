(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpEmbedHeader', {
            controller: DpEmbedHeader,
            templateUrl: 'modules/header/components/embed-header/embed-header.html',
            controllerAs: 'vm'
        });

    DpEmbedHeader.$inject = ['store', 'stateUrlConverter', '$location'];

    function DpEmbedHeader (store, stateUrlConverter, $location) {
        const vm = this,
            url = $location.protocol() + '://' + $location.host() + ':' + $location.port();

        store.subscribe(update);
        update();

        function update () {
            const ghostState = angular.copy(store.getState());

            ghostState.atlas.isEmbedPreview = false;
            vm.link = url + stateUrlConverter.state2url(ghostState);
            vm.html = `<iframe width="500" height="400" src="${vm.link}" frameborder="0"></iframe>`;
        }
    }
})();
