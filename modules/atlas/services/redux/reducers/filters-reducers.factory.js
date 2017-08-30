(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('filtersReducers', filtersReducersFactory);

    filtersReducersFactory.$inject = ['ACTIONS'];

    function filtersReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.APPLY_FILTERS.id] = applyFiltersReducer;
        reducers[ACTIONS.EMPTY_FILTERS.id] = emptyFiltersReducer;

        return reducers;

        /**
         * @param {Object} state
         * @param {Object} payload
         *
         * @returns {Object} newState
         */
        function applyFiltersReducer (state, payload) {
            return {
                ...state,
                filters: {...payload}
            };
        }

        /**
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function emptyFiltersReducer (state) {
            return {
                ...state,
                filters: {}
            };
        }
    }
})();
