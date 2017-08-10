(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('straatbeeldReducers', straatbeeldReducersFactory);

    straatbeeldReducersFactory.$inject = ['ACTIONS', 'STRAATBEELD_CONFIG'];

    function straatbeeldReducersFactory (ACTIONS, STRAATBEELD_CONFIG) {
        var reducers = {};

        reducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id] = fetchStraatbeeldByIdReducer;
        reducers[ACTIONS.FETCH_STRAATBEELD_BY_HOTSPOT.id] = fetchStraatbeeldByIdReducer;
        reducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id] = fetchStraatbeeldByLocationReducer;
        reducers[ACTIONS.SET_STRAATBEELD_HISTORY.id] = setStraatbeeldHistoryReducer;
        reducers[ACTIONS.STRAATBEELD_FULLSCREEN.id] = straatbeeldFullscreenReducer;
        reducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id] = showStraatbeeldReducer;
        reducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT.id] = showStraatbeeldSubsequentReducer;
        reducers[ACTIONS.SET_STRAATBEELD_ORIENTATION.id] = setOrientationReducer;

        return reducers;

        /**
         * @description If the oldState had an active straatbeeld it will remember the heading.
         *
         * @param {Object} state
         * @param {Object} payload - {id: 'abc123', heading: 90}
         *
         * @returns {Object} newState
         */
        function fetchStraatbeeldByIdReducer (state, payload) {
            return {
                ...state,
                straatbeeld: {
                    ...(angular.isObject(state.straatbeeld) ? {...state.straatbeeld} : {}),
                    ...resetStraatbeeld(),
                    id: payload.id,
                    heading: payload.heading || state.straatbeeld && state.straatbeeld.heading || 0,
                    isInitial: payload.isInitial,
                    isFullscreen: angular.isDefined(payload.isFullscreen) ? payload.isFullscreen
                        : state.straatbeeld ? state.straatbeeld.isFullscreen : undefined
                },
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    highlight: false,
                    isLoading: true
                } : state.map,
                search: null,
                dataSelection: null
            };
        }

        /**
         * @param {Object} state
         * @param {Array} payload - A location, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function fetchStraatbeeldByLocationReducer (state, payload) {
            return {
                ...state,
                straatbeeld: {
                    ...(angular.isObject(state.straatbeeld) ? {...state.straatbeeld} : {}),
                    ...resetStraatbeeld(),
                    location: payload,
                    targetLocation: payload
                },
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    showActiveOverlays: false,
                    isFullscreen: false,
                    geometry: [],
                    viewCenter: (state.layerSelection && state.layerSelection.isEnabled) ||
                        (state.map && state.map.isFullscreen) ? payload : undefined
                } : state.map,
                layerSelection: angular.isObject(state.layerSelection) ? {
                    ...state.layerSelection,
                    isEnabled: false
                } : state.layerSelection,
                page: angular.isObject(state.page) ? {
                    ...state.page,
                    name: null
                } : state.page,
                search: null,
                dataSelection: null,
                detail: null
            };
        }

        function resetStraatbeeld () {
            // Resets straatbeeld properties
            // Leave any other properties of straatbeeld untouched
            return {
                id: null,
                location: null,
                isInitial: true,
                date: null,
                hotspots: [],
                heading: null,
                pitch: null,
                fov: null,
                image: null,
                isLoading: true
            };
        }

        function straatbeeldFullscreenReducer (state, payload) {
            return {
                ...state,
                straatbeeld: angular.isObject(state.straatbeeld) ? {
                    ...state.straatbeeld,
                    isFullscreen: angular.isDefined(payload) ? payload : state.straatbeeld.isFullscreen
                } : state.straatbeeld
            };
        }

        /**
         * @param {Object} state
         * @param {Object} payload -  data from straatbeeld-api
         *
         * @returns {Object} newState
         */
        function showStraatbeeldReducer (state, payload) {
            return {
                ...state,
                straatbeeld: angular.isObject(state.straatbeeld) ? {
                    ...state.straatbeeld,
                    id: payload.id || state.straatbeeld.id,
                    date: payload.date,
                    pitch: state.straatbeeld.pitch || 0,
                    fov: state.straatbeeld.fov || STRAATBEELD_CONFIG.DEFAULT_FOV,
                    heading: angular.isArray(state.straatbeeld.location) &&
                        angular.isArray(state.straatbeeld.targetLocation)
                        ? getHeadingDegrees(payload.location, state.straatbeeld.targetLocation)
                        : state.straatbeeld.heading,
                    hotspots: payload.hotspots,
                    isLoading: false,
                    location: payload.location,
                    image: payload.image
                } : state.straatbeeld,
                map: angular.isObject(state.map) && angular.isObject(state.straatbeeld) ? {
                    ...state.map,
                    isLoading: false,
                    viewCenter: angular.isObject(state.straatbeeld) && !angular.isArray(state.straatbeeld.location)
                        ? payload.location : state.map.viewCenter
                } : state.map
            };
        }

        /**
         * @param {Object} oldState
         * @param {Object} payload -  data from straatbeeld-api
         *
         * @returns {Object} newState
         */
        function showStraatbeeldSubsequentReducer (oldState, payload) {
            const state = showStraatbeeldReducer(oldState, payload);

            return {
                ...state,
                map: angular.isObject(state.map) ? {
                    ...state.map,
                    viewCenter: angular.isObject(state.straatbeeld) ? payload.location : state.map.viewCenter
                } : state.map
            };
        }

        function setOrientationReducer (state, payload) {
            return {
                ...state,
                straatbeeld: angular.isObject(state.straatbeeld) ? {
                    ...state.straatbeeld,
                    heading: payload.heading,
                    pitch: payload.pitch,
                    fov: payload.fov
                } : state.straatbeeld
            };
        }

        function setStraatbeeldHistoryReducer (state, payload) {
            return {
                ...state,
                straatbeeld: angular.isObject(state.straatbeeld) ? {
                    ...state.straatbeeld,
                    history: payload
                } : state.straatbeeld
            };
        }

        function getHeadingDegrees ([x1, y1], [x2, y2]) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        }
    }
})();
