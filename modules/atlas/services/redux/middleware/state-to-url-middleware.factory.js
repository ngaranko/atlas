(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrlMiddleware', stateToUrlMiddlewareFactory);

    stateToUrlMiddlewareFactory.$inject = ['stateToUrl', 'ACTIONS'];

    function stateToUrlMiddlewareFactory (stateToUrl, ACTIONS) {
        var ignoreActions = [
                ACTIONS.URL_CHANGE.id, // Prevent infinite loops
                ACTIONS.FETCH_DETAIL.id, // Don't update the state before asynchronous call are finished
                ACTIONS.FETCH_STRAATBEELD.id,
                ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY.id,
                ACTIONS.MAP_CLICK.id,
                ACTIONS.HIDE_STRAATBEELD.id,
                ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION.id,
                ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY.id,
                ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id
            ],
            useReplace = [
                ACTIONS.MAP_SET_BASELAYER.id, // Replace the URL instead of adding a new entry to the browser history
                ACTIONS.MAP_ADD_OVERLAY.id,
                ACTIONS.MAP_REMOVE_OVERLAY.id,
                ACTIONS.MAP_TOGGLE_VISIBILITY_OVERLAY.id,
                ACTIONS.MAP_PAN.id,
                ACTIONS.MAP_ZOOM.id,
                ACTIONS.SHOW_MAP_ACTIVE_OVERLAYS.id,
                ACTIONS.HIDE_MAP_ACTIVE_OVERLAYS.id,
                ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT.id,
                ACTIONS.SET_STRAATBEELD_ORIENTATION.id
            ];

        return function (store) {
            return function (next) {
                return function (action) {
                    var returnValue;

                    // Update the state first
                    returnValue = next(action);

                    // Then update the URL
                    if (ignoreActions.indexOf(action.type.id) === -1) {
                        stateToUrl.update(
                            store.getState(),
                            useReplace.indexOf(action.type.id) !== -1
                        );
                    }
                    return returnValue;
                };
            };
        };
    }
})();
