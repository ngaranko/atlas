(() => {
    'use strict';

    angular
        .module('dpMap')
        .factory('activeOverlays', activeOverlaysFactory);

    activeOverlaysFactory.$inject = ['overlays', 'store'];

    function activeOverlaysFactory (overlays, store) {
        let allOverlays = [];

        return {
            getOverlays,
            setOverlays,
            isVisibleAtCurrentZoom,
            getVisibleOverlays,
            getOverlaysWarning
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

        function getVisibleOverlays (zoom) {
            return getVisibleSources(zoom)
                .filter(source => source.detailItem && source.detailSize)
                .filter((a, index, self) => self.findIndex((b) => {
                    return b.detailItem === a.detailItem;
                }) === index);
        }

        function getOverlaysWarning (zoom) {
            return getVisibleSources(zoom)
                .filter(source => source.noDetail)
                .map(a => a.label_short)
                .join(', ');
        }

        // non public methods
        function getVisibleSources (zoom) {
            return allOverlays.filter(source => source.isVisible && isVisibleAtCurrentZoom(source.id, zoom))
                .map(source => overlays.SOURCES[source.id]);
        }
    }
})();
