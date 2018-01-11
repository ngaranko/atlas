const addHeading = (element, text) => {
    const headingNode = document.createElement('H3');
    const textNode = document.createTextNode(text);
    headingNode.appendChild(textNode);
    headingNode.setAttribute('class', 'u-sr-only');
    if (element && element.append) {
        element.append(headingNode);
    }
};

(function () {
    angular
        .module('dpMap')
        .factory('zoom', zoomFactory);

    zoomFactory.$inject = ['$rootScope', 'L', 'store', 'ACTIONS', 'mapConfig', 'panning'];

    function zoomFactory ($rootScope, L, store, ACTIONS, mapConfig, panning) {
        let zoom;

        return {
            initialize,
            setZoom,
            getZoom
        };

        function initialize (leafletMap) {
            const scaleControl = L.control.scale(mapConfig.SCALE_OPTIONS);
            scaleControl.addTo(leafletMap);
            addHeading(scaleControl.getContainer(), 'Kaartschaal');
            L.control.zoom(mapConfig.ZOOM_OPTIONS).addTo(leafletMap);

            zoom = 11;

            setDoubleClickZoom(leafletMap);

            leafletMap.on('zoomend', function () {
                setDoubleClickZoom(leafletMap);

                $rootScope.$applyAsync(function () {
                    store.dispatch({
                        type: ACTIONS.MAP_ZOOM,
                        payload: {
                            viewCenter: panning.getCurrentLocation(leafletMap),
                            zoom: leafletMap.getZoom()
                        }
                    });

                    zoom = leafletMap.getZoom();
                });
            });
        }

        function getZoom () {
            return zoom;
        }

        function setZoom (leafletMap, zoomLevel) {
            leafletMap.setZoom(zoomLevel, {
                animate: false
            });

            zoom = zoomLevel;
        }

        function setDoubleClickZoom (leafletMap) {
            if (leafletMap.getZoom() === mapConfig.BASE_LAYER_OPTIONS.maxZoom) {
                leafletMap.doubleClickZoom.disable();
            } else {
                leafletMap.doubleClickZoom.enable();
            }
        }
    }
})();
