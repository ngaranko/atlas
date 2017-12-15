(() => {
    'use strict';

    angular
        .module('dpShared')
        .factory('activeOverlays', activeOverlaysFactory);

    activeOverlaysFactory.$inject = ['overlays', 'store'];

    function activeOverlaysFactory (OVERLAYS, store) {
        let allOverlays = [];

        return {
            getOverlays,
            setOverlays,
            isVisibleAtCurrentZoom,
            getVisibleOverlays,
            getOverlaysLabels,
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
            if (!OVERLAYS.SOURCES[overlay]) {
                return false;
            }
            zoom = zoom || store.getState().map.zoom;
            return zoom >= OVERLAYS.SOURCES[overlay].minZoom && zoom <= OVERLAYS.SOURCES[overlay].maxZoom;
        }

        function getVisibleOverlays (zoom) {
            return getVisibleSources(zoom)
                .filter(source => source.detailUrl && source.detailItem)
                .filter((a, index, self) => self.findIndex((b) => {
                    return b.detailItem === a.detailItem;
                }) === index);
        }

        function getOverlaysWarning (zoom) {
            const labels = getVisibleSources(zoom)
                .filter(source => source.noDetail)
                .map(a => a.parent_label || a.label_short);

            return [...new Set(labels)].join(', ');
        }

        function getOverlaysLabels (zoom) {
            const labels = getVisibleSources(zoom)
                .map(a => a.parent_label || a.label_short);

            return [...new Set(labels)].join(', ');
        }

        // non public methods
        function getVisibleSources (zoom) {
            return allOverlays.filter(source => source.isVisible && isVisibleAtCurrentZoom(source.id, zoom))
                .map(source => OVERLAYS.SOURCES[source.id]);
        }
    }
})();
