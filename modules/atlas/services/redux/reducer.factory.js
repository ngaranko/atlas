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
            const MapPanelReducer = $window.reducers.MapPanelReducer;
            const UiReducer = $window.reducers.UiReducer;
            const UserReducer = $window.reducers.UserReducer;
            const newRootReducer = combineReducers({
                isMapPanelVisible: MapPanelReducer,
                ui: UiReducer,
                user: UserReducer
            });
            const filteredState = {
                isMapPanelVisible: oldState.isMapPanelVisible,
                ui: oldState.ui,
                user: oldState.user
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
