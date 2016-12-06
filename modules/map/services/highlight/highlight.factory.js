(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('highlight', highlightFactory);

    highlightFactory.$inject = [
        'L',
        'crsService',
        'ICON_CONFIG',
        'geojson',
        'crsConverter',
        'mapConfig',
        'panning',
        'store',
        'ACTIONS',
        'CLUSTERED_MARKERS_CONFIG'
    ];

    function highlightFactory (
        L,
        crsService,
        ICON_CONFIG,
        geojson,
        crsConverter,
        mapConfig,
        panning,
        store,
        ACTIONS,
        CLUSTERED_MARKERS_CONFIG) {
        var layers = {};

        return {
            initialize: initialize,
            addMarker: addMarker,
            removeMarker: removeMarker,
            addCluster: addCluster,
            removeCluster: removeCluster
        };

        function initialize () {
            L.Icon.Default.imagePath = 'assets';
        }

        /**
         * @param {Object} leafletMap - A Leaflet map instance
         * @param {Object} item - An object with the following properties:
         *  - id: in case of a marker this needs to be a mapping to a key of ICON_CONFIG
         *  - geometry: GeoJSON using RD coordinates
         */
        function addMarker (leafletMap, item) {
            var layer,
                bounds,
                location,
                zoomLevel;

            item.geometry.crs = crsService.getRdObject();

            layer = L.Proj.geoJson(item.geometry, {
                style: function () {
                    return {
                        color: 'red',
                        fillColor: 'red',
                        weight: 2,
                        opacity: 1.6,
                        fillOpacity: 0.2
                    };
                },
                pointToLayer: function (feature, latLng) {
                    var icon,
                        rotationAngle;
                    icon = L.icon(ICON_CONFIG[item.id]);
                    rotationAngle = item.orientation || 0;

                    return L.marker(latLng, {
                        icon: icon,
                        rotationAngle: rotationAngle
                    });
                }
            });

            layers[item.id] = layer;

            if (item.useAutoFocus) {
                bounds = layer.getBounds();
                zoomLevel = leafletMap.getBoundsZoom(bounds);

                if (!isNaN(zoomLevel)) {
                    // A valid zoom level has been determined
                    leafletMap.fitBounds(bounds, {
                        animate: false
                    });

                    location = panning.getCurrentLocation(leafletMap);
                } else {
                    // Set the location and zoomLevel manually
                    location = crsConverter.rdToWgs84(geojson.getCenter(item.geometry));
                    zoomLevel = Math.max(leafletMap.getZoom(), mapConfig.DEFAULT_ZOOM_HIGHLIGHT);
                }

                store.dispatch({
                    type: ACTIONS.MAP_ZOOM,
                    payload: {
                        viewCenter: location,
                        zoom: zoomLevel
                    }
                });
            }

            leafletMap.addLayer(layer);
        }

        function removeMarker (leafletMap, item) {
            leafletMap.removeLayer(layers[item.id]);
        }

        function addCluster (leafletMap, markers) {
            let clusteredLayer = L.markerClusterGroup(CLUSTERED_MARKERS_CONFIG);

            markers.forEach(function (location) {
                clusteredLayer.addLayer(
                    L.marker(location, {
                        icon: L.icon(ICON_CONFIG.detail)
                    })
                );
            });

            leafletMap.addLayer(clusteredLayer);
        }

        function removeCluster (leafletMap) {
            // console.log('removeCluster', leafletMap);
        }
    }
})();
