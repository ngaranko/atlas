(() => {
    angular
        .module('dpShared')
        .factory('nearsestDetail', nearsestDetailFactory);

    nearsestDetailFactory.$inject = ['$q', 'api', 'store', 'ACTIONS', 'mapConfig'];

    function nearsestDetailFactory ($q, api, store, ACTIONS, mapConfig) {
        let detailResults = [],
            detailLocation = [],
            dispatcher;

        return {
            getResults,
            getLocation,
            search
        };

        // public methods
        function getResults () {
            return detailResults;
        }

        function getLocation () {
            return detailLocation;
        }

        function search (location, overlays, callback) {
            const state = store.getState(),
                allRequests = [];

            detailLocation = location;
            detailResults = [];
            dispatcher = callback;

            overlays.forEach(function (overlay) {
                const searchParams = {
                    item: overlay.detailItem,
                    lat: location[0],
                    lon: location[1]
                };

                if (angular.isNumber(overlay.detailSize)) {
                    searchParams.radius = Math.round(
                        Math.pow(2, mapConfig.BASE_LAYER_OPTIONS.maxZoom - state.map.zoom) / 2) *
                        (overlay.detailSize || 1);
                }

                const request = api.getByUri('geosearch/search/', searchParams).then(
                    data => data,
                    () => { return { features: [] }; });    // empty features on failure op api call

                allRequests.push(request);
            });

            return $q.all(allRequests).then(checkForDetailResults);
        }

        // non public methods
        function checkForDetailResults (newDetailResults) {
            const results = newDetailResults
                    .map(i => i.features)
                    .reduce((a, b) => a.concat(b))
                    .map(i => i.properties)
                    .sort((a, b) => a.distance > b.distance);

            detailResults = results;

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
            } else if (angular.isFunction(dispatcher)) {
                // not found item: do original geosearch
                dispatcher.call();
            }
        }
    }
})();
