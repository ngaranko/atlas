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
         * @param {Object} oldState
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
        function fetchDataSelectionReducer (oldState, payload) {
            const newState = angular.copy(oldState);

            newState.map.isFullscreen = false;

            newState.layerSelection.isEnabled = null;
            newState.search = null;
            newState.page.name = null;
            newState.detail = null;
            newState.straatbeeld = null;

            const mergeInto = angular.isString(payload) ? {
                query: payload,
                page: 1,
                view: 'CARDS',
                dataset: 'catalogus'
            } : payload;
            mergeInto.filters = mergeInto.filters || {};

            newState.dataSelection = Object.keys(mergeInto).reduce((result, key) => {
                result[key] = mergeInto[key];
                return result;
            }, newState.dataSelection || {});

            if (!newState.dataSelection.view) {
                // Default view is table view
                newState.dataSelection.view = 'TABLE';
            }

            // LIST loading might include markers => set map loading accordingly
            newState.map.isLoading = newState.dataSelection.view === 'LIST';

            newState.dataSelection.geometryFilter = newState.dataSelection.geometryFilter ||
                {
                    markers: [],
                    description: ''
                };

            newState.dataSelection.markers = [];
            newState.dataSelection.isLoading = true;
            newState.dataSelection.isFullscreen = newState.dataSelection.view !== 'LIST';

            if (angular.isString(payload)) {
                // text search: reset filter
                newState.dataSelection.filters = {};
            }

            return newState;
        }

        /**
         * @param {Object} state
         * @param {Array} payload - Markers for the leaflet.markercluster plugin
         *
         * @returns {Object} newState
         */
        function showDataSelectionReducer (state, payload) {
            const dataSelection = angular.isObject(state.dataSelection) ? {...state.dataSelection}
                : state.dataSelection === null ? null : {};

            if (dataSelection) {
                dataSelection.markers = payload;
                dataSelection.isLoading = false;
                dataSelection.isFullscreen = dataSelection.view !== 'LIST';
            }

            return {
                ...state,
                dataSelection: dataSelection,
                map: {
                    ...state.map,
                    isLoading: false
                }
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
            const dataSelection = angular.isObject(state.dataSelection) ? {...state.dataSelection}
                : state.dataSelection === null ? null : {};

            if (dataSelection) {
                dataSelection.markers = payload;
                dataSelection.isLoading = false;
                dataSelection.isFullscreen = dataSelection.view !== 'LIST';
                dataSelection.reset = false;
            }

            return {
                ...state,
                dataSelection: dataSelection,
                map: {
                    ...state.map,
                    isLoading: false
                }
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
                dataSelection: {
                    ...state.dataSelection,
                    page: payload
                }
            };
        }

        /**
         * @param {Object} state
         * @param {String} payload
         *
         * @returns {Object} newState
         */
        function setDataSelectionViewReducer (state, payload) {
            const dataSelection = angular.isObject(state.dataSelection) ? {...state.dataSelection}
                : state.dataSelection === null ? null : {};

            ['LIST', 'TABLE', 'CARDS'].forEach(legalValue => {
                if (payload === legalValue) {
                    dataSelection.view = payload;
                    dataSelection.isLoading = true;
                }
            });

            return {
                ...state,
                dataSelection: dataSelection,
                map: {
                    ...state.map,
                    isLoading: dataSelection.view === 'LIST'
                }
            };
        }
    }
})();
