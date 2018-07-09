import identity from 'lodash.identity';

import generateId from '../../../../src/shared/services/state-token-generator';

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
                        ...activeFilters,
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
                    geoJsons: [
                        data.eigenpercelen && {
                            geoJson: data.eigenpercelen,
                            id: generateId(),
                            type: 'dataSelection'
                        },
                        data.niet_eigenpercelen && {
                            geoJson: data.niet_eigenpercelen,
                            id: generateId(),
                            type: 'dataSelectionAlternate'
                        },
                        {
                            geoJson: {
                                coordinates: [
                                    [
                                      [data.extent[0], data.extent[1]],
                                      [data.extent[2], data.extent[3]]
                                    ]
                                ],
                                type: 'Polygon'
                            },
                            id: generateId(),
                            type: 'dataSelectionBounds'
                        }
                    ].filter(identity),
                    markers: data.appartementen.map((appartement) => ({
                        iconData: {
                            zoomLevel,
                            count: appartement.aantal
                        },
                        position: [
                            appartement.geometrie.coordinates[1],
                            appartement.geometrie.coordinates[0]
                        ],
                        type: 'dataSelectionType'
                    }))
                }))
                : $q.resolve([]);
        }
    }
})();
