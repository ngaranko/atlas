(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlReducers', urlReducersFactory);

    urlReducersFactory.$inject = ['ACTIONS', 'STATE_URL_CONVERSION', 'stateUrlConverter'];

    function urlReducersFactory (ACTIONS, STATE_URL_CONVERSION, stateUrlConverter) {
        // Define the pre and post methods here to have the code coverage assured
        STATE_URL_CONVERSION.pre = {
            state: defaultState,
            search: defaultSearch
        };
        STATE_URL_CONVERSION.post = {
            dataSelection: postDataSelection,
            detail: postDetail,
            straatbeeld: postStraatbeeld
        };

        return {
            [ACTIONS.URL_CHANGE.id]: urlChangeReducer
        };

        function urlChangeReducer (oldState, payload) {
            return stateUrlConverter.params2state(oldState, payload);
        }

        function defaultState (oldState, newState, payload) {
            if (angular.equals(payload, {})) {
                // When no params, go to home page and show initial map
                newState.page = 'home';
                newState.map = angular.copy(STATE_URL_CONVERSION.initialValues.map);
            }
            return newState;
        }

        function defaultSearch (oldState, newState) {
            return angular.copy(oldState || newState);
        }

        function postDataSelection (oldState, newState) {
            if (oldState) {
                newState.markers = oldState.markers;
                newState.isLoading = oldState.isLoading;
            }
            newState.isFullscreen = newState.view !== 'LIST';
        }

        function postDetail (oldState, newState) {
            if (oldState && oldState.endpoint === newState.endpoint) {
                newState.display = oldState.display;
                newState.geometry = oldState.geometry;
                newState.isLoading = oldState.isLoading;
                newState.isFullscreen = oldState.isFullscreen;
            }
        }

        function postStraatbeeld (oldState, newState) {
            if (oldState && oldState.id === newState.id) {
                newState.image = oldState.image;
                newState.hotspots = oldState.hotspots;
                newState.date = oldState.date;
                newState.location = oldState.location;
                newState.isInitial = false;
                newState.isLoading = oldState.isLoading;
            }
        }
    }
})();
