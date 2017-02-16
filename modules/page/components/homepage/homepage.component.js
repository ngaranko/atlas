(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpHomepage', {
            templateUrl: 'modules/page/components/homepage/homepage.html',
            controller: DpHomepageController,
            controllerAs: 'vm'
        });

    DpHomepageController.$inject = ['store', 'ACTIONS', 'userSettings'];

    function DpHomepageController (store, ACTIONS, userSettings) {
        let vm = this;

        vm.fetchStraatbeeld = function () {
            store.dispatch({
                type: ACTIONS.FETCH_STRAATBEELD_BY_ID,
                payload: {
                    id: 'TMX7315120208-000073_pano_0005_000451',
                    heading: 226,
                    isInitial: true,
                    isFullscreen: userSettings.fullscreenStraatbeeld.value === true.toString()
                }
            });
        };
    }
})();
