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
            const straatbeeld = initializeStraatbeeld(state.straatbeeld || {});

            if (angular.isDefined(payload.isFullscreen)) {
                straatbeeld.isFullscreen = payload.isFullscreen;
            }

            return {
                ...state,
                straatbeeld: {
                    ...straatbeeld,
                    id: payload.id,
                    heading: payload.heading || state.straatbeeld.heading || 0,
                    isInitial: payload.isInitial
                },
                map: {
                    ...state.map,
                    highlight: false,
                    isLoading: true
                },
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
            const straatbeeld = initializeStraatbeeld(state.straatbeeld || {}),
                map = state.map ? {...state.map} : state.map;

            if ((state.layerSelection && state.layerSelection.isEnabled) ||
                (map && map.isFullscreen)) {
                map.viewCenter = payload;
            }

            return {
                ...state,
                straatbeeld: {
                    ...straatbeeld,
                    location: payload,
                    targetLocation: payload
                },
                map: {
                    ...map,
                    showActiveOverlays: false,
                    isFullscreen: false,
                    geometry: []
                },
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: false
                },
                page: {
                    ...state.page,
                    name: null
                },
                search: null,
                dataSelection: null,
                detail: null
            };
        }

        function initializeStraatbeeld (straatbeeld) {
            // Resets straatbeeld properties
            // Leave any other properties of straatbeeld untouched
            return {
                ...straatbeeld,
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
            const straatbeeld = state.straatbeeld ? {...state.straatbeeld} : state.straatbeeld;

            if (angular.isDefined(payload)) {
                straatbeeld.isFullscreen = payload;
            }

            return {
                ...state,
                straatbeeld
            };
        }

        /**
         * @param {Object} state
         * @param {Object} payload -  data from straatbeeld-api
         *
         * @returns {Object} newState
         */
        function showStraatbeeldReducer (state, payload) {
            const straatbeeld = state.straatbeeld ? {...state.straatbeeld} : state.straatbeeld,
                map = state.map ? {...state.map} : state.map;

            // Straatbeeld can be null if another action gets triggered between FETCH_STRAATBEELD and SHOW_STRAATBEELD
            if (angular.isObject(straatbeeld)) {
                straatbeeld.id = payload.id || state.straatbeeld.id;
                straatbeeld.date = payload.date;

                straatbeeld.pitch = state.straatbeeld.pitch || 0;
                straatbeeld.fov = state.straatbeeld.fov || STRAATBEELD_CONFIG.DEFAULT_FOV;

                if (angular.isArray(straatbeeld.location)) {
                    // straatbeeld is loaded by location
                    if (angular.isArray(straatbeeld.targetLocation)) {
                        // Point at the target location
                        straatbeeld.heading = getHeadingDegrees(
                            payload.location,
                            straatbeeld.targetLocation
                        );
                    }
                } else {
                    // straatbeeld is loaded by id, center map on location
                    map.viewCenter = payload.location;
                }

                straatbeeld.hotspots = payload.hotspots;
                straatbeeld.isLoading = false;
                straatbeeld.location = payload.location;
                straatbeeld.image = payload.image;
                map.isLoading = false;
            }

            return {
                ...state,
                straatbeeld: {
                    ...straatbeeld
                },
                map: {
                    ...map
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {Object} payload -  data from straatbeeld-api
         *
         * @returns {Object} newState
         */
        function showStraatbeeldSubsequentReducer (oldState, payload) {
            const state = showStraatbeeldReducer(oldState, payload),
                map = state.map ? {...state.map} : state.map;

            if (angular.isObject(state.straatbeeld)) {
                // Keep map centered on last selected hotspot
                map.viewCenter = payload.location;
            }

            return {
                ...state,
                map: map
            };
        }

        function setOrientationReducer (state, payload) {
            return {
                ...state,
                straatbeeld: {
                    ...state.straatbeeld,
                    heading: payload.heading,
                    pitch: payload.pitch,
                    fov: payload.fov
                }
            };
        }

        function setStraatbeeldHistoryReducer (state, payload) {
            return {
                ...state,
                straatbeeld: {
                    ...state.straatbeeld,
                    history: payload
                }
            };
        }

        function getHeadingDegrees ([x1, y1], [x2, y2]) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        }
    }
})();
