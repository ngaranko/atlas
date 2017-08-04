(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('mapReducers', mapReducersFactory);

    mapReducersFactory.$inject = ['ACTIONS', 'DRAW_TOOL_CONFIG'];

    function mapReducersFactory (ACTIONS, DRAW_TOOL_CONFIG) {
        var reducers = {};

        reducers[ACTIONS.SHOW_MAP.id] = showMapReducer;
        reducers[ACTIONS.MAP_SET_BASELAYER.id] = mapSetBaselayerReducer;
        reducers[ACTIONS.MAP_ADD_OVERLAY.id] = mapAddOverlayReducer;
        reducers[ACTIONS.MAP_REMOVE_OVERLAY.id] = mapRemoveOverlayReducer;
        reducers[ACTIONS.MAP_ADD_PANO_OVERLAY.id] = mapAddPanoOverlayReducer;
        reducers[ACTIONS.MAP_REMOVE_PANO_OVERLAY.id] = mapRemovePanoOverlayReducer;
        reducers[ACTIONS.MAP_TOGGLE_VISIBILITY_OVERLAY.id] = mapToggleVisibilityOverlay;
        reducers[ACTIONS.MAP_PAN.id] = mapPanReducer;
        reducers[ACTIONS.MAP_ZOOM.id] = mapZoomReducer;
        reducers[ACTIONS.MAP_HIGHLIGHT.id] = mapHighlightReducer;
        reducers[ACTIONS.MAP_FULLSCREEN.id] = mapFullscreenReducer;
        reducers[ACTIONS.MAP_START_DRAWING.id] = mapStartDrawingReducer;
        reducers[ACTIONS.MAP_CLEAR_DRAWING.id] = mapClearDrawingReducer;
        reducers[ACTIONS.MAP_END_DRAWING.id] = mapEndDrawingReducer;
        reducers[ACTIONS.SHOW_MAP_ACTIVE_OVERLAYS.id] = showActiveOverlaysReducer;
        reducers[ACTIONS.HIDE_MAP_ACTIVE_OVERLAYS.id] = hideActiveOverlaysReducer;

        return reducers;

        function showMapReducer (state) {
            return {
                ...state,
                map: {
                    ...state.map,
                    isFullscreen: true
                },
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: true
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The name of the baseLayer, it should match a key from base-layers.constant.js
         *
         * @returns {Object} newState
         */
        function mapSetBaselayerReducer (state, payload) {
            return {
                ...state,
                map: {
                    ...state.map,
                    baseLayer: payload
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The name of the overlay, it should match a key from overlays.constant.js
         *
         * @returns {Object} newState
         */
        function mapAddOverlayReducer (state, payload) {
            const showActiveOverlays = !state.map.overlays
                .filter((overlay) => overlay.id.indexOf('pano') !== 0)
                .length;

            return {
                ...state,
                map: {
                    ...state.map,
                    showActiveOverlays: showActiveOverlays ? true : state.map.showActiveOverlays,
                    overlays: [
                        ...state.map.overlays,
                        {id: payload, isVisible: true}
                    ]
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The name of the overlay, it should match a key from overlays.constant.js
         *
         * @returns {Object} newState
         */
        function mapRemoveOverlayReducer (state, payload) {
            return {
                ...state,
                map: {
                    ...state.map,
                    overlays: state.map.overlays.filter((a) => a.id !== payload)
                }
            };
        }

        /**
         * Adds a 'pano' (street view) layer according to the 'history'
         * selection in the state ('pano2016', 'pano2020', or 'pano' by default
         * for the most recent version).
         *
         * Removes any active 'pano' (street view) layer before adding the new
         * one.
         *
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function mapAddPanoOverlayReducer (state) {
            const newLayer = (state.straatbeeld && state.straatbeeld.history)
                ? `pano${state.straatbeeld.history}`
                : 'pano';

            if (state.map.overlays.filter((overlay) => overlay.id === newLayer).length === 1) {
                // Ovelay already exists
                return state;
            }

            // Remove any active 'pano' layers
            const overlays = state.map.overlays
                .filter((overlay) => !overlay.id.startsWith('pano'));

            return {
                ...state,
                map: {
                    ...state.map,
                    overlays: [
                        ...overlays,
                        {id: newLayer, isVisible: true}
                    ]
                }
            };
        }

        /**
         * Removes any active 'pano' (street view) layer.
         *
         * @param {Object} oldState
         *
         * @returns {Object} newState
         */
        function mapRemovePanoOverlayReducer (state) {
            // Remove all active 'pano' layers
            const overlays = state.map.overlays
                .filter((overlay) => !overlay.id.startsWith('pano'));

            if (overlays.length === state.map.overlays.length) {
                // No 'pano' layers were active
                return state;
            }

            return {
                ...state,
                map: {
                    ...state.map,
                    overlays: overlays
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {String} payload - The name of the overlay, it should match a key from overlays.constant.js
         *
         * @returns {Object} newState
         */
        function mapToggleVisibilityOverlay (state, payload) {
            const overlays = [...state.map.overlays].map((overlay) => {
                return {
                    ...overlay,
                    isVisible: overlay.id === payload ? !overlay.isVisible : overlay.isVisible
                };
            });

            return {
                ...state,
                map: {
                    ...state.map,
                    overlays: overlays
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {Array} payload - The new position in Array format, e.g. [52.123, 4.789]
         *
         * @returns {Object} newState
         */
        function mapPanReducer (state, payload) {
            return {
                ...state,
                map: {
                    ...state.map,
                    viewCenter: payload
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - The zoom level
         *
         * @returns {Object} newState
         */
        function mapZoomReducer (state, payload) {
            return {
                ...state,
                map: {
                    ...state.map,
                    zoom: payload.zoom,
                    viewCenter: angular.isArray(payload.viewCenter) ? payload.viewCenter : state.map.viewCenter
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - Set hightlighting on or off
         *
         * @returns {Object} newState
         */
        function mapHighlightReducer (state, payload) {
            return {
                ...state,
                map: {
                    ...state.map,
                    highlight: payload
                }
            };
        }

        /**
         * @param {Object} oldState
         * @param {Number} payload - Boolean that defines whether or not fullscreen mode is enabled
         *
         * @returns {Object} newState
         */
        function mapFullscreenReducer (state, payload) {
            return {
                ...state,
                map: {
                    ...state.map,
                    isFullscreen: payload
                },
                layerSelection: {
                    ...state.layerSelection,
                    isEnabled: false
                }
            };
        }

        function mapStartDrawingReducer (oldState, payload) {
            var newState = angular.copy(oldState);
            newState.map.drawingMode = payload;

            if (payload !== DRAW_TOOL_CONFIG.DRAWING_MODE.EDIT &&
                newState.dataSelection &&
                newState.dataSelection.geometryFilter &&
                newState.dataSelection.geometryFilter.markers &&
                newState.dataSelection.geometryFilter.markers.length > 0) {
                newState = resetDataSelection(newState);
            }

            return newState;
        }

        function mapClearDrawingReducer (state) {
            return {
                ...state,
                map: {
                    ...state.map,
                    geometry: []
                }
            };
        }

        function mapEndDrawingReducer (oldState, payload) {
            var newState = angular.copy(oldState);

            newState.map.drawingMode = DRAW_TOOL_CONFIG.DRAWING_MODE.NONE;

            if (payload) {
                if (payload.markers.length > 2) {
                    newState.page.name = null;

                    // Polygon
                    newState = resetDataSelection(newState, angular.copy(payload));

                    newState.map.geometry = [];
                    newState.map.isLoading = true;
                    newState.map.isFullscreen = false;

                    newState.layerSelection.isEnabled = false;
                } else if (payload.markers.length === 2) {
                    // Line
                    newState.map.geometry = payload.markers;
                }
            }

            return newState;
        }

        function showActiveOverlaysReducer (state) {
            return {
                ...state,
                map: {
                    ...state.map,
                    showActiveOverlays: true
                }
            };
        }

        function hideActiveOverlaysReducer (state) {
            return {
                ...state,
                map: {
                    ...state.map,
                    showActiveOverlays: false
                }
            };
        }

        function resetDataSelection (state, payload = {markers: []}) {
            const newState = angular.copy(state);

            if (!newState.dataSelection) {
                newState.dataSelection = {};
                newState.dataSelection.dataset = 'bag';
                newState.dataSelection.filters = {};
            }
            newState.dataSelection.geometryFilter = payload;
            newState.dataSelection.page = 1;
            newState.dataSelection.isFullscreen = false;
            newState.dataSelection.isLoading = true;
            newState.dataSelection.view = 'LIST';
            newState.dataSelection.markers = [];

            // No markers, the data selection goes back to its default state of
            // showing all data => make sure it will not trigger a url state
            // change
            if (payload.markers.length === 0) {
                newState.dataSelection.reset = true;
            }

            return newState;
        }
    }
})();
