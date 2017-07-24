(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('activeOverlays', activeOverlaysFactory);

    activeOverlaysFactory.$inject = ['overlays', 'store'];

    function activeOverlaysFactory (overlays, store) {
        let allOverlays = [];

        return {
            setOverlays,
            getOverlays,
            isVisibleAtCurrentZoom,
            getDetailOverlays,
            getDetailOverlaysNames
        };

        // public methods
        function getOverlays () {
            return allOverlays;
        }

        function setOverlays (newOverlays) {
            if (!angular.equals(newOverlays, allOverlays)) {
                allOverlays = newOverlays;
            }
        }

        function isVisibleAtCurrentZoom (overlay, zoom) {
            zoom = zoom || store.getState().map.zoom;
            return zoom >= overlays.SOURCES[overlay].minZoom && zoom <= overlays.SOURCES[overlay].maxZoom;
        }

        function getDetailOverlays (zoom) {
            return getVisibleOverlays(zoom)
                .filter(source => source.detail_item && source.detail_size)
                .filter((a, index, self) => self.findIndex((b) => {
                    return b.detail_item === a.detail_item;
                }) === index);
        }

        function getDetailOverlaysNames (zoom) {
            return getVisibleOverlays(zoom)
                .map(a => a.label_short)
                .join(', ');
        }

        // non public methods
        function getVisibleOverlays (zoom) {
            return allOverlays.filter(source => source.isVisible && isVisibleAtCurrentZoom(source.id, zoom))
                .map(source => overlays.SOURCES[source.id]);
        }
    }
})();
