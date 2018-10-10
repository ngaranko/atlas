import DetailsReducer from '../details';
import isObject from '../../shared/services/is-object';

import DataSelectionReducer from '../data-selection-reducers';
import MapPreviewPanelReducer from '../../map/ducks/preview-panel/map-preview-panel';
import homeReducer from '../home-reducers';
import straatbeeldReducers from './straatbeeld-reducers';
import MapSearchResultsReducer from '../../map/ducks/search-results/map-search-results';
import deepFreeze from '../../shared/services/freeze/freeze';
import urlReducersInit from '../url-reducers';
import { isDevelopment } from '../../shared/environment';
import stateUrlConverter from '../../shared/services/routing/state-url-converter';
import ACTIONS, { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../shared/actions';

export default (oldState, action) => {
  const UrlReducers = urlReducersInit(stateUrlConverter);

  const detailReducers = { // TODO: try moving to root reducer
    FETCH_DETAIL: DetailsReducer,
    SHOW_DETAIL: DetailsReducer,
    DETAIL_FULLSCREEN: DetailsReducer
  };

  const mapSearchResultsReducers = { // TODO: try moving to root reducer
    [ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY]: MapSearchResultsReducer,
    [FETCH_SEARCH_RESULTS_BY_LOCATION]: MapSearchResultsReducer,
    [ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY]: MapSearchResultsReducer,
    [ACTIONS.SHOW_SEARCH_RESULTS]: MapSearchResultsReducer,
    FETCH_MAP_SEARCH_RESULTS_REQUEST: MapSearchResultsReducer,
    FETCH_MAP_SEARCH_RESULTS_SUCCESS: MapSearchResultsReducer,
    FETCH_MAP_SEARCH_RESULTS_FAILURE: MapSearchResultsReducer
  };

  const mapPreviewPanelReducers = {
    OPEN_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
    CLOSE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer
  };

  const actions = {
    ...DataSelectionReducer,
    ...detailReducers,
    ...homeReducer,
    ...mapPreviewPanelReducers,
    ...mapSearchResultsReducers,
    ...straatbeeldReducers,
    ...UrlReducers
  };

  // if the action type is found in the deprecated reducers handle the action here
  const handledByOldReducers = isObject(action) &&
    typeof actions[action.type] === 'function';

  // eslint-disable-next-line no-prototype-builtins
  const handlesAction = (reducer, actionType) => reducer.hasOwnProperty(actionType);

  if (handledByOldReducers) {
    let newState;

    // reformat the action for the detailReducers
    if (handlesAction(detailReducers, action.type) ||
      handlesAction(mapSearchResultsReducers, action.type) ||
      handlesAction(mapPreviewPanelReducers, action.type)
    ) {
      newState = actions[action.type](oldState, action);
    } else {
      newState = actions[action.type](oldState, action.payload);
    }

    // TODO make isDevelopment Vanilla JS
    if (isDevelopment()) {
      deepFreeze(newState); // TODO
    }

    return newState;
  }

  return oldState;
};
