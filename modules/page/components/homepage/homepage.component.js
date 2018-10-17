import ReactDOM from 'react-dom';
import { routing, toMap, toPanorama } from '../../../../src/app/routes';

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
        const homepageAddressBlockWrapper = $window.HomepageAddressBlockWrapper;
        let homepageAddressBlockWrapperContainer;

        vm.routing = routing;
        vm.toMap = toMap();
        // vm.toMap = { type: vm.routing.map.type, query: { lat: 52.3931081, lng: 4.8932945 } };
        vm.panaramaTo = toPanorama(HOMEPAGE_CONFIG.PANORAMA.id);

        vm.toCatalogus = { type: routing.catalogus.type };

        $timeout(setReactComponents);

        function setReactComponents () {
            homepageAddressBlockWrapperContainer = $window.document.querySelector('#homepage-address-block');
            if (homepageAddressBlockWrapper && homepageAddressBlockWrapperContainer) {
                render(React.createElement(homepageAddressBlockWrapper, null), homepageAddressBlockWrapperContainer);
            }
        }

        this.$onDestroy = () => {
            if (homepageAddressBlockWrapperContainer) {
                ReactDOM.unmountComponentAtNode(homepageAddressBlockWrapperContainer);
            }
        };
    }
})();
