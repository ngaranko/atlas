(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpHomepage', {
            templateUrl: 'modules/page/components/homepage/homepage.html',
            controller: DpHomepageController,
            controllerAs: 'vm'
        });

    DpHomepageController.$inject = ['HOMEPAGE_CONFIG', '$window', '$timeout'];

    function DpHomepageController (HOMEPAGE_CONFIG, $window, $timeout) {
        const vm = this;
        const React = $window.React;
        const render = $window.render;
        const homepageBlockWrapper = $window.HomepageBlockWrapper;

        vm.fetchStraatbeeldPayload = angular.merge(
            {},
            HOMEPAGE_CONFIG.PANORAMA,
            {
                isInitial: true,
                isFullscreen: false
            }
        );
        $timeout(setReactComponents);

        function setReactComponents () {
            const homepageBlockWrapperContainer = $window.document.querySelector('#homepage-address-block');
            if (homepageBlockWrapperContainer) {
                render(React.createElement(homepageBlockWrapper, null), homepageBlockWrapperContainer);
            }
        }
    }
})();
