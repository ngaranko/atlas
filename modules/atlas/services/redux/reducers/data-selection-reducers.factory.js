(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('dataSelectionReducers', dataSelectionReducersFactory);

    dataSelectionReducersFactory.$inject = [
        'ACTIONS',
        'stateUrlConverter'
    ];

    function dataSelectionReducersFactory (ACTIONS, stateUrlConverter) {
        const reducers = {};

        reducers[ACTIONS.FETCH_DATA_SELECTION.id] = fetchDataSelectionReducer;
        reducers[ACTIONS.SHOW_DATA_SELECTION.id] = showDataSelectionReducer;
        reducers[ACTIONS.RESET_DATA_SELECTION.id] = resetDataSelectionReducer;
        reducers[ACTIONS.NAVIGATE_DATA_SELECTION.id] = navigateDataSelectionReducer;
        reducers[ACTIONS.SET_DATA_SELECTION_VIEW.id] = setDataSelectionViewReducer;

        return reducers;

        /**
         * @param {Object} state
         * @param {string|Object} payload A string with the search query or
         *                                an object with the following keys:
         *                                - query (String): The search query
         *                                - filters (Object): Active filters
         *                                Except these two keys, other keys
         *                                will be copied if they are in the
         *                                object, but no defualt value will be
         *                                provided.
         *
         * @returns {Object} newState
         */
        // eslint-disable-next-line complexity
        function fetchDataSelectionReducer (state, payload) {
            const mergeInto = angular.isString(payload) ? {
                query: payload,
                page: 1,
                view: 'CARDS',
                dataset: 'catalogus'
            } : payload;
            mergeInto.filters = mergeInto.filters || {};

            const view = mergeInto.view || state.dataSelection && state.dataSelection.view || 'TABLE';

            if (mergeInto.resetFiltersFromState) {
                mergeInto.filters = state.filters;
                delete mergeInto.resetFiltersFromState;
            }

            let geometryFilter = state.dataSelection && state.dataSelection.geometryFilter ||
                {
                    markers: [],
                    description: ''
                };

            if (mergeInto.resetGeometryFilter) {
                geometryFilter = {
                    markers: [],
                    description: ''
                };
                delete mergeInto.resetGeometryFilter;
            }

            return {
                ...state,
                dataSelection: {
                    ...(angular.isObject(state.dataSelection) ? state.dataSelection : ''),
                    ...mergeInto,
                    markers: [],
                    view: view,
                    isLoading: true,
                    isFullscreen: view !== 'LIST',
                    geometryFilter: {...geometryFilter}
                },
                filters: {...mergeInto.filters},
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isFullscreen: false,
                    // LIST loading might include markers => set map loading accordingly
                    isLoading: view === 'LIST'
                } : state.map,
                page: angular.isObject(state.page) ? {
                    ...state.page,
                    name: null
                } : state.page,
                layerSelection: angular.isObject(state.layerSelection) ? {
                    ...state.layerSelection,
                    isEnabled: false
                } : state.layerSelection,
                search: null,
                detail: null,
                straatbeeld: null
            };
        }

        /**
         * @param {Object} state
         * @param {Array} payload - Markers for the leaflet.markercluster plugin
         *
         * @returns {Object} newState
         */
        function showDataSelectionReducer (state, payload) {
            return {
                ...state,
                dataSelection: angular.isObject(state.dataSelection) ? {
                    ...state.dataSelection,
                    markers: payload,
                    isLoading: false,
                    isFullscreen: state.dataSelection.view !== 'LIST'
                } : state.dataSelection,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isLoading: false
                } : state.map
            };
        }

        /**
         * Does the same as `showDataSelectionReducer`, but will not trigger a
         * url state change.
         *
         * @param {Object} state
         * @param {Array} payload - Markers for the leaflet.markercluster plugin
         *
         * @returns {Object} newState
         */
        function resetDataSelectionReducer (state, payload) {
            return {
                ...state,
                dataSelection: angular.isObject(state.dataSelection) ? {
                    ...state.dataSelection,
                    markers: payload,
                    isLoading: false,
                    isFullscreen: state.dataSelection.view !== 'LIST',
                    reset: false
                } : state.dataSelection,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isLoading: false
                } : state.map
            };
        }

        /**
         * @param {Object} state
         * @param {Number} payload - The destination page
         *
         * @returns {Object} newState
         */
        function navigateDataSelectionReducer (state, payload) {
            return {
                ...state,
                dataSelection: angular.isObject(state.dataSelection) ? {
                    ...state.dataSelection,
                    page: payload
                } : state.dataSelection
            };
        }

        /**
         * @param {Object} state
         * @param {String} payload
         *
         * @returns {Object} newState
         */
        function setDataSelectionViewReducer (state, payload) {
            const views = ['LIST', 'TABLE', 'CARDS'],
                viewFound = views.indexOf(payload) !== -1,
                view = viewFound ? payload : undefined;

            return {
                ...state,
                dataSelection: angular.isObject(state.dataSelection) ? {
                    ...state.dataSelection,
                    view: view,
                    isLoading: viewFound
                } : state.dataSelection,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    isLoading: view === 'LIST'
                } : state.map
            };
        }
    }
})();
