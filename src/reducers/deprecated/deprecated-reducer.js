import DetailsReducer from '../details';
import isObject from '../../shared/services/is-object';

import DataSelectionReducer from '../data-selection-reducers';
import MapPreviewPanelReducer from '../../map/ducks/preview-panel/map-preview-panel';
import PageReducer from '../page-reducers';
import homeReducer from '../home-reducers';
import filtersReducers from './filters-reducers';
import straatbeeldReducers from './straatbeeld-reducers';
import MapSearchResultsReducer from '../../map/ducks/search-results/map-search-results';
import MapClickLocationReducer from '../../map/ducks/click-location/map-click-location';
import searchReducers from './search-reducers';
import deepFreeze from '../../shared/services/freeze/freeze';
import urlReducersInit from '../url-reducers';
import { isDevelopment } from '../../shared/environment';
import stateUrlConverter from '../../shared/services/routing/state-url-converter';

export default (oldState, action) => {
    /**
     *
     *
     *
     * Try not to add new stuff to this file. DEPRECATED
     *
     *
     *
     */
  const UrlReducers = urlReducersInit(stateUrlConverter);

  const detailReducers = { // TODO: try moving to root reducer
    FETCH_DETAIL: DetailsReducer,
    SHOW_DETAIL: DetailsReducer,
    DETAIL_FULLSCREEN: DetailsReducer
  };

  const mapSearchResultsReducers = { // TODO: try moving to root reducer
    FETCH_MAP_SEARCH_RESULTS_FAILURE: MapSearchResultsReducer,
    FETCH_MAP_SEARCH_RESULTS_REQUEST: MapSearchResultsReducer,
    FETCH_MAP_SEARCH_RESULTS_SUCCESS: MapSearchResultsReducer
  };

  const mapClickLocationReducers = { // TODO: try moving to root reducer
    SET_MAP_CLICK_LOCATION: MapClickLocationReducer
  };

  const mapPreviewPanelReducers = {
    OPEN_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
    CLOSE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
    MAXIMIZE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer
  };

  const actions = {
    ...DataSelectionReducer,
    ...detailReducers,
    ...filtersReducers,
    ...homeReducer,
    ...mapPreviewPanelReducers,
    ...mapSearchResultsReducers,
    ...mapClickLocationReducers,
    ...PageReducer,
    ...searchReducers,
    ...straatbeeldReducers,
    ...UrlReducers
  };

    // Are we dealing with vanilla js reducers here (type is a
    // string instead of an object with an ID and other
    // optional attributes)? e.g.:
    // {
    //      type: 'SHOW_DETAIL'
    // }
  const vanilla = isObject(action) &&
      typeof action.type === 'string' &&
      typeof actions[action.type] === 'function';

    // {
    //      type: {
    //          id: 'FOO'
    //      }
    // }
  const legacy = isObject(action) &&
      isObject(action.type) &&
      typeof actions[action.type.id] === 'function';

  if (vanilla) {
    const result = actions[action.type](oldState, action);
    if (isDevelopment()) {
      deepFreeze(result);
    }
    return result;
  } else if (legacy) {
      // eslint-disable-next-line no-prototype-builtins
    if (detailReducers.hasOwnProperty(action.type.id)) {
        // eslint-disable-next-line no-param-reassign
      action.payload = {
        ...action,
        type: action.type.id
      };
    }
    const result = actions[action.type.id](oldState, action.payload);
      // TODO make isDevelopment Vanilla JS
    if (isDevelopment()) {
      deepFreeze(result); // TODO
    }
    return result;
  }
  return oldState;
};
