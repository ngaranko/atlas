import isObject from '../is-object';
import ACTIONS from '../../actions';

const contextMiddleware = (store) => (next) => (action) => {
  // Straatbeeld and detail can both exist in an invisible state
  // An invisible straatbeeld or detail determines the meaning of some events
  // These events are thus context sensitive and therefore handled by this middleware
  const { straatbeeld, detail, page } = store.getState();

  if (action.type.id === ACTIONS.MAP_CLICK.id) {
    if (isObject(straatbeeld)) {
      // a MAP CLICK when straatbeeld is active fetches the most nearby straatbeeld
      action.type = ACTIONS.FETCH_STRAATBEELD_BY_LOCATION;
    } else {
      // the default action for a MAP CLICK is to show the search results for that location
      action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
    }
  }

  if (action.type.id === ACTIONS.HIDE_STRAATBEELD.id) {
    if (isObject(detail)) {
      // Close of straatbeeld reopens the original detail page if available
      action.type = ACTIONS.FETCH_DETAIL;
      action.payload = detail.endpoint;
    } else if (isObject(page) && typeof page.name === 'string') {
      action.type = ACTIONS.SHOW_PAGE;
      action.payload = page;
    } else {
      // The default action is to show the search results at the location
      action.type = ACTIONS.FETCH_SEARCH_RESULTS_BY_LOCATION;
      action.payload = straatbeeld.location;
    }
  }

  return next(action);
  /* eslint-enable complexity */
};

export default contextMiddleware;
