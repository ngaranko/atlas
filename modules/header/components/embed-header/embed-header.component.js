import { hideEmbedMode } from '../../../../src/shared/ducks/ui/ui';

(() => {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpEmbedHeader', {
            controller: DpEmbedHeader,
            templateUrl: 'modules/header/components/embed-header/embed-header.html',
            controllerAs: 'vm'
        });

    DpEmbedHeader.$inject = ['$interval', '$scope'];

    function DpEmbedHeader ($interval, $scope) {
        const vm = this;

        vm.hideEmbedMode = hideEmbedMode();
        const iframe = window.document.getElementById('atlas-iframe-map');

        function setUrlFromIframe () {
            const { location: { href } } = iframe.contentWindow;
            vm.link = href;
            vm.html = `<iframe width="500" height="400" src="${href}" frameborder="0"></iframe>`;
        }

        setUrlFromIframe();

        // Todo: figure out a better way to embed a map
        // (e.g. by only sharing locations / results instead of just any state of the map)
        // Now we need to check the URL of the iFrame, as this can change
        const iframeChecker = $interval(setUrlFromIframe, 500);

        $scope.$on('$destroy', function () {
            $interval.cancel(iframeChecker);
        });
    }
})();
