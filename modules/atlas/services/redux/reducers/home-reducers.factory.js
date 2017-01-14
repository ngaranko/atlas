(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('homeReducers', homeReducersFactory);

    homeReducersFactory.$inject = ['ACTIONS', 'stateUrlConverter'];

    function homeReducersFactory (ACTIONS, stateUrlConverter) {
        var reducers = {};

        reducers[ACTIONS.SHOW_HOME.id] = showHomeReducer;

        return reducers;

        /**
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function showHomeReducer (oldState) {
            var newState = angular.copy(stateUrlConverter.DEFAULT_STATE);

            newState.isPrintMode = oldState.isPrintMode;

            return newState;
        }
    }
})();

