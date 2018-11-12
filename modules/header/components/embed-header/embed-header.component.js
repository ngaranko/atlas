import { getEmbedButtonLink } from '../../../../src/store/query-synchronization';

(() => {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpEmbedHeader', {
            controller: DpEmbedHeader,
            templateUrl: 'modules/header/components/embed-header/embed-header.html',
            controllerAs: 'vm'
        });

    DpEmbedHeader.$inject = ['$interval', '$scope', '$document'];

    function DpEmbedHeader ($interval, $scope) {
        const vm = this;

        const iframe = window.document.getElementById('atlas-iframe-map');

        function seturlFromIframe () {
            const { location: { href } } = iframe.contentWindow;
            vm.link = getEmbedButtonLink(location);
            vm.html = `<iframe width="500" height="400" src="${href}" frameborder="0"></iframe>`;
        }

        seturlFromIframe();

        // Todo: figure out a better way to embed a map
        // (e.g. by only sharing locations / results instead of just any state of the map)
        // Now we need to check the URL of the iFrame, as this can change
        const iframeChecker = $interval(seturlFromIframe, 500);

        $scope.$on('$destroy', function () {
            $interval.cancel(iframeChecker);
        });
    }
})();
