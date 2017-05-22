(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('printReducers', printReducersFactory);

    printReducersFactory.$inject = ['ACTIONS', 'DRAW_TOOL_CONFIG'];

    function printReducersFactory (ACTIONS, DRAW_TOOL_CONFIG) {
        var reducers = {};

        reducers[ACTIONS.SHOW_PRINT.id] = showPrintReducer;
        reducers[ACTIONS.HIDE_PRINT.id] = hidePrintReducer;

        return reducers;

        /**
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function showPrintReducer (oldState) {
            var newState = angular.copy(oldState);

            newState.atlas.isPrintMode = true;
            newState.map.drawingMode = DRAW_TOOL_CONFIG.DRAWING_MODE.NONE;

            return newState;
        }

        /**
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function hidePrintReducer (oldState) {
            var newState = angular.copy(oldState);

            newState.atlas.isPrintMode = false;
            newState.map.drawingMode = DRAW_TOOL_CONFIG.DRAWING_MODE.NONE;

            return newState;
        }
    }
})();

