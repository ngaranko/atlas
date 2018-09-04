import ACTIONS from '../shared/actions';

/**
 * @param {Object} state
 * @param {String} payload - The name of the page, it should match the name of an HTML template from the page
 * module
 *
 * @returns {Object} newState
 */
function showPageReducer(state, payload) {
  return {
    ...state,
    page: typeof state.page === 'object' ? {
      ...state.page,
      name: payload.name,
      type: payload.type,
      item: payload.item
    } : state.page,
    ui: typeof state.ui === 'object' ? {
      ...state.ui,
      isMapPanelVisible: false,
      isMapFullscreen: false
    } : state.ui,
    search: null,
    detail: null,
    straatbeeld: null,
    dataSelection: null
  };
}

var reducers = {};

reducers[ACTIONS.SHOW_PAGE.id] = showPageReducer;

export default reducers;
