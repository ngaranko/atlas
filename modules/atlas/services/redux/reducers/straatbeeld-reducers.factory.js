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
         * @param {Object} oldState
         * @param {Object} payload - {id: 'abc123', heading: 90}
         *
         * @returns {Object} newState
         */
        function fetchStraatbeeldByIdReducer (oldState, payload) {
            const newState = angular.copy(oldState);

            newState.straatbeeld = newState.straatbeeld || {};
            initializeStraatbeeld(newState.straatbeeld);

            newState.straatbeeld.id = payload.id;
            newState.straatbeeld.heading = payload.heading ||
                (oldState.straatbeeld && oldState.straatbeeld.heading) ||
                0;
            newState.straatbeeld.isInitial = payload.isInitial;

            if (angular.isDefined(payload.isFullscreen)) {
                newState.straatbeeld.isFullscreen = payload.isFullscreen;
            }

            newState.map.highlight = null;

            newState.search = null;

            newState.dataSelection = null;

            newState.map.isLoading = true;

            return newState;
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - A location, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function fetchStraatbeeldByLocationReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.straatbeeld = newState.straatbeeld || {};
            initializeStraatbeeld(newState.straatbeeld);

            newState.straatbeeld.location = payload;
            newState.straatbeeld.targetLocation = payload;

            if ((oldState.layerSelection && oldState.layerSelection.isEnabled) ||
                (oldState.map && oldState.map.isFullscreen)) {
                newState.map.viewCenter = payload;
            }

            if (newState.layerSelection) {
                newState.layerSelection.isEnabled = false;
            }
            if (newState.map) {
                newState.map.showActiveOverlays = false;
                newState.map.isFullscreen = false;
                newState.map.geometry = [];
            }
            newState.search = null;
            if (newState.page) {
                newState.page.name = null;
            }
            // If a straatbeeld is loaded by it's location
            // then clear any active detail
            newState.detail = null;
            newState.dataSelection = null;

            return newState;
        }

        function initializeStraatbeeld (straatbeeld) {
            // Resets straatbeeld properties
            // Leave any other properties of straatbeeld untouched
            straatbeeld.id = null;
            straatbeeld.location = null;

            straatbeeld.isInitial = true;

            straatbeeld.date = null;
            straatbeeld.hotspots = [];

            straatbeeld.heading = null;
            straatbeeld.pitch = null;
            straatbeeld.fov = null;

            straatbeeld.image = null;

            straatbeeld.isLoading = true;
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
