(function () {
    'use strict';

    angular
        .module('dpMap')
        .factory('onMapClick', onMapClickFactory);

    onMapClickFactory.$inject = ['$rootScope', 'store', 'ACTIONS', 'drawTool', 'suppress', 'activeOverlays',
        'geosearch'];

    function onMapClickFactory ($rootScope, store, ACTIONS, drawTool, suppress, activeOverlays, geosearch) {
        let location = [],
            type;

        return {
            initialize
        };

        function initialize (leafletMap) {
            leafletMap.on('click', onMapClick);
        }

        function onMapClick (event) {
            const visibleOverlays = activeOverlays.getDetailOverlays(),
                state = store.getState();

            type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
            location = [event.latlng.lat, event.latlng.lng];

            if (angular.isObject(state.straatbeeld)) {
                type = ACTIONS.FETCH_STRAATBEELD_BY_LOCATION;
            } else {
                if (visibleOverlays.length > 0) {
                    // do geosearch for nearest item in overlays
                    // if it exists go to detail of that item
                    geosearch.searchDetail(location, visibleOverlays, state.map.zoom).then(checkForDetailResults);
                }
            }

            if (!(suppress.isBusy() || state.atlas.isEmbedPreview || state.atlas.isEmbed || drawTool.isEnabled())) {
                $rootScope.$applyAsync(function () {
                    dispatchAction();
                });
            }
        }

        function checkForDetailResults (detailResults) {
            const results = detailResults
                    .map(i => i.features)
                    .reduce((a, b) => a.concat(b))
                    .map(i => i.properties)
                    .sort((a, b) => a.distance > b.distance);

            activeOverlays.setResults(results);
            activeOverlays.setLocation(location);

            if (results && results.length > 0) {
                // found detail item
                store.dispatch({
                    type: ACTIONS.MAP_HIGHLIGHT,
                    payload: false
                });

                store.dispatch({
                    type: ACTIONS.FETCH_DETAIL,
                    payload: results[0].uri
                });
            } else {
                // not found item: do original geosearch
                dispatchAction();
            }
        }

        function dispatchAction () {
            store.dispatch({
                type: type,
                payload: location
            });
        }
    }
})();
