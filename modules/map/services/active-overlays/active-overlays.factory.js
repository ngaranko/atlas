(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('activeOverlays', activeOverlaysFactory);

    activeOverlaysFactory.$inject = ['overlays'];

    function activeOverlaysFactory (overlays) {
        let allOverlays = [];

        return {
            setOverlays,
            getOverlays,
            getVisibleOverlays,
            isVisibleAtCurrentZoom
        };

        function setOverlays (newOverlays) {
            allOverlays = newOverlays;
        }

        function getOverlays () {
            return allOverlays;
        }

        function getVisibleOverlays (zoom) {
            return allOverlays.filter(source => source.isVisible && isVisibleAtCurrentZoom(source.id, zoom))
                .map(source => overlays.SOURCES[source.id])
                .filter(source => source.detail_item && source.detail_radius);
        }

        function isVisibleAtCurrentZoom (overlay, zoom) {
            return zoom >= overlays.SOURCES[overlay].minZoom && zoom <= overlays.SOURCES[overlay].maxZoom;
        }
    }
})();
