(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('activeOverlays', activeOverlaysFactory);

    activeOverlaysFactory.$inject = ['overlays', 'store'];

    function activeOverlaysFactory (overlays, store) {
        let allOverlays = [],
            allResults = [],
            location = [];

        return {
            getOverlays,
            setOverlays,
            getResults,
            setResults,
            getLocation,
            setLocation,
            isVisibleAtCurrentZoom,
            getDetailOverlays,
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

        function getResults () {
            return allResults;
        }

        function setResults (results) {
            allResults = results;
        }

        function getLocation () {
            return location;
        }

        function setLocation (newLocation) {
            location = newLocation;
        }

        function isVisibleAtCurrentZoom (overlay, zoom) {
            zoom = zoom || store.getState().map.zoom;
            return zoom >= overlays.SOURCES[overlay].minZoom && zoom <= overlays.SOURCES[overlay].maxZoom;
        }

        function getDetailOverlays (zoom) {
            return getVisibleOverlays(zoom)
                .filter(source => source.detailItem && source.detailSize)
                .filter((a, index, self) => self.findIndex((b) => {
                    return b.detailItem === a.detailItem;
                }) === index);
        }

        function getOverlaysWarning (zoom) {
            return getVisibleOverlays(zoom)
                .filter(source => source.noDetail)
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
