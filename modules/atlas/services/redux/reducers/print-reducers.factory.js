(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('printReducers', printReducersFactory);

    printReducersFactory.$inject = ['ACTIONS'];

    function printReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_PRINT.id] = showPrintReducer;
        reducers[ACTIONS.HIDE_PRINT.id] = hidePrintReducer;

        return reducers;

        /**
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function showPrintReducer (state) {
            return {
                ...state,
                atlas: angular.isObject(state.atlas) ? {
                    ...state.atlas,
                    isPrintMode: true
                } : state.atlas
            };
        }

        /**
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function hidePrintReducer (state) {
            return {
                ...state,
                atlas: angular.isObject(state.atlas) ? {
                    ...state.atlas,
                    isPrintMode: false
                } : state.atlas
            };
        }
    }
})();
