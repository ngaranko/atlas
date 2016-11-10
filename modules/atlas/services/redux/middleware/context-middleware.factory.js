(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('contextMiddleware', contextMiddlewareFactory);

    contextMiddlewareFactory.$inject = ['ACTIONS'];

    function contextMiddlewareFactory (ACTIONS) {
        return function (store) {
            return function (next) {
                return function (action) {
                    // Transform generic actions like MAP_CLICK into a real action
                    // This transformation is context sensitive

                    if (action.type === ACTIONS.MAP_CLICK) {
                        let straatbeeld = store.getState().straatbeeld;
                        if (angular.isObject(straatbeeld) && straatbeeld.id) {
                            // a MAP CLICK when straatbeeld is active fetches the most nearby straatbeeld
                            action.type = ACTIONS.FETCH_STRAATBEELD_BY_LOCATION;
                        } else {
                            // the dfault action for a MAP CLICK is to show the search results for that location
                            action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
                        }
                    }

                    if (action.type === ACTIONS.CLOSE_STRAATBEELD) {
                        action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
                        action.payload = store.getState().straatbeeld.location;
                    }

                    // Update the state
                    return next(action);
                };
            };
        };
    }
})();
