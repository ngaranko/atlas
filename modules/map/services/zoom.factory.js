import {
    initialize,
    getZoom,
    setZoom
} from '../../../src/map/components/map/zoomControls';

(function () {
    angular
        .module('dpMap')
        .factory('zoom', zoomFactory);

    zoomFactory.$inject = ['$rootScope', 'store', 'ACTIONS', 'mapConfig'];

    function zoomFactory ($rootScope, store, ACTIONS, mapConfig) {
        return {
            initialize: (leafletMap) => initialize(store, mapConfig, leafletMap),
            setZoom,
            getZoom
        };
    }
})();
