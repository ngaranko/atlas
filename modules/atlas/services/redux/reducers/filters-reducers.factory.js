(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('filtersReducers', filtersReducersFactory);

    filtersReducersFactory.$inject = ['ACTIONS'];

    function filtersReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.EMPTY_FILTERS.id] = emptyFiltersReducer;

        return reducers;

        /**
         * @param {Object} state
         *
         * @returns {Object} newState
         */
        function emptyFiltersReducer (state) {
            console.log('EMPTY_FILTERS');
            return {
                ...state,
                filters: {}
            };
        }
    }
})();
