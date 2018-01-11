import { initialize, panTo, getCurrentLocation } from '../../../src/map/components/map/panControls';

(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('panning', panningFactory);

    panningFactory.$inject = ['$rootScope', 'store', 'ACTIONS'];

    function panningFactory ($rootScope, store, ACTIONS) {
        return {
            initialize: (leafletMap) => initialize(store, leafletMap),
            panTo: panTo,
            getCurrentLocation: getCurrentLocation
        };
    }
})();
