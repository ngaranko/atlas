(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpHomepage', {
            templateUrl: 'modules/page/components/homepage/homepage.html',
            controller: DpHomepageController,
            controllerAs: 'vm'
        });

    DpHomepageController.$inject = [];

    function DpHomepageController () {
        let vm = this;

        vm.fetchStraatbeeldPayload = {
            id: 'TMX7315120208-000073_pano_0005_000451',
            heading: 226,
            isInitial: true,
            isFullscreen: false
        };
    }
})();
