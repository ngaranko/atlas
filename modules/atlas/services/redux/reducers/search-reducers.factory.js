(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('searchReducers', searchReducersFactory);

    searchReducersFactory.$inject = ['ACTIONS', 'dpBaseCoder'];

    function searchReducersFactory (ACTIONS, dpBaseCoder) {
        var reducers = {};

        reducers[ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY.id] = fetchSearchResultsByQueryReducer;
        reducers[ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION.id] = fetchSearchResultsByLocationReducer;
        reducers[ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY.id] = fetchSearchResultsCategoryReducer;
        reducers[ACTIONS.SHOW_SEARCH_RESULTS.id] = showSearchResultsReducer;

        return reducers;

        /**
         * @param {Object} state
         * @param {String} payload - A search query
         *
         * @returns {Object} newState
         */
        function fetchSearchResultsByQueryReducer (state, payload) {
            return {
                ...state,
                search: {
                    isLoading: true,
                    isFullscreen: true,
                    query: payload || null,
                    location: null,
                    category: null,
                    numberOfResults: null
                },
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isFullscreen: false
                } : state.map,
                ui: angular.isObject(state.ui) ? {
                    ...state.ui,
                    isMapPanelVisible: false
                } : state.ui,
                page: angular.isObject(state.page) ? {
                    ...state.page,
                    name: null,
                    type: null
                } : state.page,
                detail: null,
                straatbeeld: null,
                dataSelection: null
            };
        }

        /**
         * @param {Object} state
         * @param {Array} payload - A location, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function fetchSearchResultsByLocationReducer (state, payload) {
            return {
                ...state,
                search: {
                    isLoading: true,
                    isFullscreen: false,
                    query: null,
                    location: dpBaseCoder.toPrecision(payload, 7),
                    category: null,
                    numberOfResults: null
                },
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    geometry: []
                } : state.map,
                page: angular.isObject(state.page) ? {
                    ...state.page,
                    name: null
                } : state.page,
                detail: null,
                straatbeeld: null,
                dataSelection: null
            };
        }

        /**
         * @param {Object} state
         * @param {String} payload - A reference to the slug of a SEARCH_CONFIG endpoint
         *
         * @returns {Object} newState
         */
        function fetchSearchResultsCategoryReducer (state, payload) {
            return {
                ...state,
                search: angular.isObject(state.search) ? {
                    ...state.search,
                    isLoading: true,
                    category: payload,
                    numberOfResults: null
                } : state.search
            };
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The number of search results
         *
         * @returns {Object} newState
         */
        function showSearchResultsReducer (state, payload) {
            return {
                ...state,
                search: angular.isObject(state.search) ? {
                    ...state.search,
                    isLoading: false,
                    numberOfResults: payload
                } : state.search,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isLoading: false
                } : state.map
            };
        }
    }
})();
