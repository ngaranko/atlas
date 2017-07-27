(() => {
    'use strict';

    angular
        .module('dpMap')
        .factory('onMapClick', onMapClickFactory);

    onMapClickFactory.$inject = ['$rootScope', 'store', 'ACTIONS', 'drawTool', 'suppress', 'activeOverlays',
        'nearestDetail'];

    function onMapClickFactory ($rootScope, store, ACTIONS, drawTool, suppress, activeOverlays,
                                nearestDetail) {
        let location = [],
            type;

        return {
            initialize
        };

        function initialize (leafletMap) {
            leafletMap.on('click', onMapClick);
        }

        function onMapClick (event) {
            const visibleOverlays = activeOverlays.getVisibleOverlays(),
                state = store.getState();

            type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
            location = [event.latlng.lat, event.latlng.lng];

            if (angular.isObject(state.straatbeeld)) {
                type = ACTIONS.FETCH_STRAATBEELD_BY_LOCATION;
            }

            if (!(suppress.isBusy() || state.atlas.isEmbedPreview || state.atlas.isEmbed || drawTool.isEnabled())) {
                $rootScope.$applyAsync(function () {
                    if (visibleOverlays.length > 0) {
                        // do geosearch for nearest item in overlays
                        // if it exists go to detail of that item
                        nearestDetail.search(location, visibleOverlays, dispatchAction);
                    } else {
                        dispatchAction();
                    }
                });
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
