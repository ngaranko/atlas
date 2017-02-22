(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpHomepage', {
            templateUrl: 'modules/page/components/homepage/homepage.html',
            controller: DpHomepageController,
            controllerAs: 'vm'
        });

    DpHomepageController.$inject = ['HOMEPAGE_CONFIG'];

    function DpHomepageController (HOMEPAGE_CONFIG) {
        let vm = this;

        vm.fetchStraatbeeldPayload = angular.merge(
            {},
            HOMEPAGE_CONFIG.PANORAMA,
            {
                isInitial: true,
                isFullscreen: false
            }
        );
    }
})();
