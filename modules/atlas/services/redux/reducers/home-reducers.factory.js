import stateUrlConverter from '../../../../../src/shared/services/routing/state-url-converter';

(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('homeReducers', homeReducersFactory);

    homeReducersFactory.$inject = ['ACTIONS'];

    function homeReducersFactory (ACTIONS) {
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
                ui: {
                    ...defaultState.ui,
                    isEmbed: state.ui.isEmbed,
                    isEmbedPreview: state.ui.isEmbedPreview,
                    isPrintMode: state.ui.isPrintMode
                }
            };
        }
    }
})();
