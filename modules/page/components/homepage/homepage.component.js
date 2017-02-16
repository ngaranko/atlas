(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpHomepage', {
            templateUrl: 'modules/page/components/homepage/homepage.html',
            controller: DpHomepageController,
            controllerAs: 'vm'
        });

    DpHomepageController.$inject = ['$rootScope', 'userSettings'];

    function DpHomepageController ($rootScope, userSettings) {
        let vm = this;

        setFetchStraatbeeldPayload();
        const deregistrationFn = $rootScope.$watch(getFullscreenPreference, setFetchStraatbeeldPayload);

        function getFullscreenPreference () {
            return userSettings.fullscreenStraatbeeld.value === true.toString();
        }

        function setFetchStraatbeeldPayload () {
            vm.fetchStraatbeeldPayload = {
                id: 'TMX7315120208-000073_pano_0005_000451',
                heading: 226,
                isInitial: true,
                isFullscreen: getFullscreenPreference()
            };
        }

        $rootScope.$on('$destroy', deregistrationFn);
    }
})();
