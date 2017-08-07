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
                    ...state.search,
                    isLoading: true,
                    isFullscreen: true,
                    query: payload || null,
                    location: null,
                    category: null,
                    numberOfResults: null
                },
                map: {
                    ...state.map,
                    isFullscreen: false
                },
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: false
                },
                page: {
                    ...state.page,
                    name: null,
                    type: null
                },
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
            const map = state.map ? {...state.map} : state.map;

            if (state.layerSelection.isEnabled || (map && state.map.isFullscreen)) {
                map.viewCenter = payload;
            }

            if (map) {
                map.showActiveOverlays = false;
                map.isFullscreen = false;
                map.geometry = [];
            }

            return {
                ...state,
                search: {
                    ...state.search,
                    isLoading: true,
                    isFullscreen: false,
                    query: null,
                    location: dpBaseCoder.toPrecision(payload, 7),
                    category: null,
                    numberOfResults: null
                },
                map: map,
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: false
                },
                page: {
                    ...state.page,
                    name: null
                },
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
            const search = state.search || {};

            return {
                ...state,
                search: {
                    ...search,
                    isLoading: true,
                    category: payload,
                    numberOfResults: null
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The number of search results
         *
         * @returns {Object} newState
         */
        function showSearchResultsReducer (state, payload) {
            const search = state.search || {},
                map = state.map ? {...state.map} : state.map;

            if (map) {
                map.isLoading = false;
            }

            // var newState = angular.copy(oldState);
            return {
                ...state,
                search: {
                    ...search,
                    isLoading: false,
                    numberOfResults: payload
                },
                map: map
            };
        }
    }
})();
