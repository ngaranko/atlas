import ACTIONS from '../../shared/actions';
import isObject from '../../shared/services/is-object';
import { routing } from '../../app/routes';


/**
 * @description If the oldState had an active straatbeeld it will remember the heading.
 *
 * @param {Object} state
 * @param {Object} payload - {id: 'abc123', heading: 90}
 *
 * @returns {Object} newState
 */
function fetchStraatbeeldByIdReducer(state) {
  return {
    ...state,
    search: null,
    dataSelection: null
  };
}

/**
 * @param {Object} oldState
 * @param {Array} payload - A location, e.g. [52.123, 4.789]
 *
 * @returns {Object} newState
 */
function fetchStraatbeeldByLocationReducer(state, payload) {
  const map = isObject(state.map) ? { ...state.map } : state.map;

  if (state.ui && (state.ui.isMapPanelVisible || state.ui.isMapFullscreen)) {
    map.viewCenter = payload;
  }

  return {
    ...state,
    map: {
      ...map,
    },
    ui: isObject(state.ui) ? {
      ...state.ui,
      isMapPanelVisible: false,
      isMapFullscreen: false
    } : state.ui,
    page: isObject(state.page) ? {
      ...state.page,
      name: null
    } : state.page,
    search: null,
    dataSelection: null,
    detail: null
  };
}

/**
 * @param {Object} state
 * @param {Object} payload -  data from straatbeeld-api
 *
 * @returns {Object} newState
 */
function showStraatbeeldReducer(state, payload) {
  return {
    ...state,
    map: isObject(state.map) && isObject(state.straatbeeld) ? {
      ...state.map,
      viewCenter: isObject(state.straatbeeld) && !Array.isArray(state.straatbeeld.location)
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
function showStraatbeeldSubsequentReducer(oldState, payload) {
  const state = showStraatbeeldReducer(oldState, payload);

  return {
    ...state,
    map: isObject(state.map) ? {
      ...state.map,
      viewCenter: isObject(state.straatbeeld) ? payload.location : state.map.viewCenter
    } : state.map
  };
}


const reducers = {};

reducers[routing.mapPanorama.type] = fetchStraatbeeldByIdReducer;
reducers[ACTIONS.FETCH_STRAATBEELD_BY_ID] = fetchStraatbeeldByIdReducer;
reducers[ACTIONS.FETCH_STRAATBEELD_BY_HOTSPOT] = fetchStraatbeeldByIdReducer;
reducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION] = fetchStraatbeeldByLocationReducer;
reducers[ACTIONS.SHOW_STRAATBEELD_INITIAL] = showStraatbeeldReducer;
reducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT] = showStraatbeeldSubsequentReducer;

export default reducers;
