import { combineReducers } from 'redux';

/* istanbul ignore next */
(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('reducer', reducerFactory);

    reducerFactory.$inject = [
        '$window',
        'deprecatedReducer'
    ];

    // eslint-disable-next-line max-params
    function reducerFactory (
             $window,
             deprecatedReducer
        ) {
        return function (oldState, action) { // eslint-disable-line complexity
            // Run state changes based on old reducers
            const deprecatedState = deprecatedReducer(oldState, action);

            // Use combine reducer for new reducers
            const UiReducer = $window.reducers.UiReducer;
            const UserReducer = $window.reducers.UserReducer;
            const newRootReducer = combineReducers({
                ui: UiReducer,
                user: UserReducer
            });
            const filteredState = {
                ui: oldState.ui,
                user: oldState.user
            };

            // Combine old and new reducer states
            const newState = {
                ...deprecatedState,
                ...newRootReducer(filteredState, action)
            };

            return newState;
        };
    }
})();
