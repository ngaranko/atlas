import DetailsReducer from '../details';

import DataSelectionReducer from '../data-selection-reducers';
import MapPreviewPanelReducer from '../../map/ducks/preview-panel/map-preview-panel';
import PageReducer from '../page-reducers';
import homeReducer from '../home-reducers';
import filtersReducers from './filters-reducers';
import straatbeeldReducers from './straatbeeld-reducers';
import MapSearchResultsReducer from '../../map/ducks/search-results/map-search-results';
import MapClickLocationReducer from '../../map/ducks/click-location/map-click-location';
import searchReducers from './search-reducers';

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
  const UrlReducers = window.reducers.UrlReducers;
  // const MapPreviewPanelReducer = $window.reducers.MapPreviewPanelReducer;      // DONE
  // const MapSearchResultsReducer = $window.reducers.MapSearchResultsReducer;    // DONE
  // const MapClickLocationReducer = $window.reducers.MapClickLocationReducer;    // DONE

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

  // var actions = angular.merge(
  //   dataSelectionReducers,   // DONE
  //   detailReducers,          // DONE
  //   filtersReducers,         // DONE
  //   homeReducers,            // DONE
  //   mapPreviewPanelReducers, // DONE
  //   mapSearchResultsReducers,// DONE
  //   mapClickLocationReducers,// DONE
  //   pageReducers,            // DONE
  //   searchReducers,          // DONE
  //   straatbeeldReducers,     // DONE
  //   urlReducers,             // DONE
  //   environment
  // );
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
    ...UrlReducers,
  };

  // Are we dealing with vanilla js reducers here (type is a
  // string instead of an object with an ID and other
  // optional attributes)? e.g.:
  // {
  //      type: 'SHOW_DETAIL'
  // }
  const vanilla = typeof action === 'object' &&
    typeof action.type === 'string' &&
    typeof actions[action.type] === 'function';

  // {
  //      type: {
  //          id: 'FOO'
  //      }
  // }
  const legacy = typeof action === 'object' &&
    typeof action.type === 'object' &&
    typeof actions[action.type.id] === 'function';

  if (vanilla) {
    return actions[action.type](oldState, action);
  } else if (legacy) {
  //   if (detailReducers.hasOwnProperty(action.type.id)) {
  //     action.payload = {
  //       ...action,
  //       type: action.type.id
  //     };
  //   }
  //
    const result = actions[action.type.id](oldState, action.payload);
  //   if (environment.isDevelopment()) {
  //     freeze.deepFreeze(result);
  //   }
    return result;
  }
  return oldState;
};
