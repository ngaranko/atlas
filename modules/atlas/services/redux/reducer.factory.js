import { combineReducers } from 'redux';

/* istanbul ignore next */
(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        '$window',
        '$rootScope',
        '$timeout',
        'deprecatedReducer'
    ];

    // eslint-disable-next-line max-params
    function reducerFactory (
             $window,
             $rootScope,
             $timeout,
             deprecatedReducer
        ) {
        return function (oldState, action) { // eslint-disable-line complexity
            // Run state changes based on old reducers
            const deprecatedState = deprecatedReducer(oldState, action);

            // Use combine reducer for new reducers
            const ErrorMessageReducer = $window.reducers.ErrorMessageReducer;
            const PanoPreviewReducer = $window.reducers.PanoPreviewReducer;
            const UiReducer = $window.reducers.UiReducer;
            const MapReducer = $window.reducers.MapReducer;
            const UserReducer = $window.reducers.UserReducer;
            const newRootReducer = combineReducers({
                error: ErrorMessageReducer,
                map: MapReducer,
                pano: PanoPreviewReducer,
                ui: UiReducer,
                user: UserReducer
            });
            const filteredState = {
                ui: deprecatedState.ui,
                user: deprecatedState.user,
                map: deprecatedState.map,

                // Using oldState instead of chaining deprecatedState from
                // other reducer for the following fields.
                // This is because these fields do not recide in the URL state,
                // the URL resolution step in the deprecatedReducer would
                // therefore reset these fields in the state.
                error: oldState.error,
                pano: oldState.pano
            };

            // Combine old and new reducer states
            const newState = {
                ...deprecatedState,
                ...newRootReducer(filteredState, action)
            };

            $timeout(() => $rootScope.$digest());

            return newState;
        };
    }
})();
