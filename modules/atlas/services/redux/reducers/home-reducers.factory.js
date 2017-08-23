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
        function showHomeReducer (state) {
            const defaultState = stateUrlConverter.getDefaultState();
            return {
                ...defaultState,
                atlas: {
                    ...defaultState.atlas,
                    isPrintMode: state.atlas.isPrintMode,
                    isEmbedPreview: state.atlas.isEmbedPreview,
                    isEmbed: state.atlas.isEmbed
                }
            };
        }
    }
})();
