(() => {
    angular
        .module('dpShared')
        .factory('nearestDetail', nearestDetailFactory);

    nearestDetailFactory.$inject = ['$q', 'api', 'store', 'ACTIONS', 'mapConfig'];

    function nearestDetailFactory ($q, api, store, ACTIONS, mapConfig) {
        let detailLocation = [],
            numberOfPoints = 0,
            dispatcher;

        return {
            getLocation,
            search
        };

        // public methods
        function getLocation () {
            return detailLocation;
        }

        function search (location, overlays, zoom, callback) {
            const pointRequests = [],
                shapeRequests = [];

            detailLocation = location;
            dispatcher = callback;
            numberOfPoints = 0;

            overlays.reverse().forEach((overlay) => {
                const searchParams = {
                    item: overlay.detailItem,
                    lat: location[0],
                    lon: location[1]
                };

                searchParams.radius = overlay.detailIsShape ? 0 : Math.round(
                    Math.pow(2, mapConfig.BASE_LAYER_OPTIONS.maxZoom - zoom) / 2);

                const request = api.getByUri(overlay.detailUrl || 'geosearch/search/', searchParams).then(
                    data => data,
                    () => { return { features: [] }; });    // empty features on failure of api call

                if (overlay.detailIsShape) {
                    shapeRequests.push(request);
                } else {
                    pointRequests.push(request);
                }
            });

            numberOfPoints = pointRequests.length;
            return $q.all(pointRequests.concat(shapeRequests)).then(checkForDetailResults);
        }

        // non public methods
        function checkForDetailResults (response) {
            const shapesArray = response.splice(numberOfPoints),
                foundShapes = flattenResponse(shapesArray),
                foundPoints = flattenResponse(response).sort((a, b) => a.distance - b.distance),
                found = foundPoints[0] || foundShapes[0];

            if (found) {
                // found detail item
                store.dispatch({
                    type: ACTIONS.MAP_HIGHLIGHT,
                    payload: false
                });

                store.dispatch({
                    type: ACTIONS.FETCH_DETAIL,
                    payload: found.uri
                });
            } else if (angular.isFunction(dispatcher)) {
                // not found item: do original geosearch
                dispatcher.call();
            }

            return found;
        }

        function flattenResponse (array) {
            if (array.length === 0) {
                return array;
            }
            return array.map(i => i.features)
                .reduce((a, b) => a.concat(b))
                .map(i => i.properties);
        }
    }
})();
