(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('contextMiddleware', contextMiddlewareFactory);

    contextMiddlewareFactory.$inject = ['stateToUrl', 'ACTIONS'];

    function contextMiddlewareFactory (state, ACTIONS) {
        return function (store) {
            return function (next) {
                return function (action) {
                    var returnValue;

                    if (action.type === ACTIONS.MAP_CLICK) {
                        if (store.getState().straatbeeld) {
                            action.type = ACTIONS.FETCH_STRAATBEELD_BY_LOCATION;
                        } else {
                            action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
                        }
                    }

                    // Update the state
                    returnValue = next(action);

                    return returnValue;
                };
            };
        };
    }
})();
