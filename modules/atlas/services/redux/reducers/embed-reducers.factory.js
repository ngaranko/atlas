(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('embedReducers', embedReducersFactory);

    embedReducersFactory.$inject = ['ACTIONS', 'DRAW_TOOL_CONFIG'];

    function embedReducersFactory (ACTIONS, DRAW_TOOL_CONFIG) {
        var reducers = {};

        reducers[ACTIONS.SHOW_EMBED_PREVIEW.id] = showEmbedPreviewReducer;
        reducers[ACTIONS.HIDE_EMBED_PREVIEW.id] = hideEmbedPreviewReducer;

        return reducers;

        /**
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function showEmbedPreviewReducer (oldState) {
            var newState = angular.copy(oldState);

            newState.atlas.isEmbedPreview = true;
            newState.map.drawingMode = DRAW_TOOL_CONFIG.DRAWING_MODE.NONE;
            newState.layerSelection.isEnabled = false;

            return newState;
        }

        /**
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function hideEmbedPreviewReducer (oldState) {
            var newState = angular.copy(oldState);

            newState.atlas.isEmbedPreview = false;
            newState.map.drawingMode = DRAW_TOOL_CONFIG.DRAWING_MODE.NONE;

            return newState;
        }
    }
})();

