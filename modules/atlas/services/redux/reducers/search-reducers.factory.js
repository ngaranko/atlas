(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('searchReducers', searchReducersFactory);

    searchReducersFactory.$inject = ['ACTIONS'];

    function searchReducersFactory (ACTIONS) {
        var reducers = {};

        reducers[ACTIONS.SHOW_SEARCH_RESULTS_BY_QUERY] = showSearchResultsByQueryReducer;
        reducers[ACTIONS.SHOW_SEARCH_RESULTS_BY_CLICK] = showSearchResultsByClickReducer;
        reducers[ACTIONS.SHOW_SEARCH_RESULTS_CATEGORY] = showSearchResultsCategoryReducer;
        reducers[ACTIONS.SHOW_NUMBER_OF_SEARCH_RESULTS] = showNumberOfSearchResultsReducer;

        return reducers;

        /**
         * @param {Object} oldState
         * @param {String} payload - A search query
         *
         * @returns {Object} newState
         */
        function showSearchResultsByQueryReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.search = {
                query: payload,
                location: null,
                category: null,
                numberOfResults: null
            };

            newState.map.highlight = null;
            newState.map.showLayerSelection = false;
            newState.map.isFullscreen = false;
            newState.page = null;
            newState.detail = null;
            newState.straatbeeld = null;
            newState.dataSelection = null;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - A location, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function showSearchResultsByClickReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.search = {
                query: null,
                location: payload,
                category: null,
                numberOfResults: null
            };

            if (oldState.map.showLayerSelection || oldState.map.isFullscreen) {
                newState.map.viewCenter = payload;
            }

            newState.map.highlight = null;
            newState.map.showLayerSelection = false;
            newState.map.showActiveOverlays = false;
            newState.map.isFullscreen = false;
            newState.page = null;
            newState.detail = null;
            newState.straatbeeld = null;
            newState.dataSelection = null;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - A reference to the slug of a SEARCH_CONFIG endpoint
         *
         * @returns {Object} newState
         */
        function showSearchResultsCategoryReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.search.category = payload;
            newState.search.numberOfResults = null;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The number of search results
         *
         * @returns {Object} newState
         */
        function showNumberOfSearchResultsReducer(oldState, payload) {
            var newState = angular.copy(oldState);

            newState.search.numberOfResults = payload;

            return newState;
        }
    }
})();

