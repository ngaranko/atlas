(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('embedReducers', embedReducersFactory);

    embedReducersFactory.$inject = ['ACTIONS'];

    function embedReducersFactory (ACTIONS, DRAW_TOOL_CONFIG) {
        var reducers = {};

        reducers[ACTIONS.SHOW_EMBED_PREVIEW.id] = showEmbedPreviewReducer;
        reducers[ACTIONS.HIDE_EMBED_PREVIEW.id] = hideEmbedPreviewReducer;

        return reducers;

        /**
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function showEmbedPreviewReducer (state) {
            return {
                ...state,
                atlas: angular.isObject(state.atlas) ? {
                    ...state.atlas,
                    isEmbedPreview: true
                } : state.atlas
            };
        }

        /**
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function hideEmbedPreviewReducer (state) {
            return {
                ...state,
                atlas: angular.isObject(state.atlas) ? {
                    ...state.atlas,
                    isEmbedPreview: false
                } : state.atlas
            };
        }
    }
})();
