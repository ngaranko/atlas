(function () {
    angular
        .module('dpDataSelection')
        .factory('dataSelectionApiBrk', dataSelectionApiBrkFactory);

    dataSelectionApiBrkFactory.$inject = ['$q', 'sharedConfig', 'api', 'dataSelectionApiDataSelection'];

    function dataSelectionApiBrkFactory ($q, sharedConfig, api, dataSelectionApiDataSelection) {
        return {
            query,
            getMarkers
        };

        function query (config, view, activeFilters, page, search, geometryFilter) {
            return dataSelectionApiDataSelection.query(config, view, activeFilters, page, search, geometryFilter);
        }

        function getMarkers (config, activeFilters, zoomLevel, boundingBox) {
            return boundingBox ? api
                .getByUri(
                    config.ENDPOINT_MARKERS, {
                        activeFilters,
                        zoom: zoomLevel,
                        bbox: {
                            _northEast: {
                                lat: boundingBox.northEast.latitude,
                                lng: boundingBox.northEast.longitude
                            },
                            _southWest: {
                                lat: boundingBox.southWest.latitude,
                                lng: boundingBox.southWest.longitude
                            }
                        }
                    }
                )
                .then((data) => ({
                    clusterMarkers: data.appartementen.map((appartement) => [
                        appartement.geometrie.coordinates[1],
                        appartement.geometrie.coordinates[0]
                    ])
                }))
                : $q.resolve([]);
        }
    }
})();
