import DetailReducer from '../details';

import DataSelectionReducer from '../data-selection-reducers';
import MapPreviewPanelReducer from '../../map/ducks/preview-panel/map-preview-panel';
import PageReducer from '../page-reducers';
import homeReducer from '../home-reducers';
import filtersReducers from './filters-reducers';
import straatbeeldReducers from './straatbeeld-reducers';

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
  // const MapPreviewPanelReducer = $window.reducers.MapPreviewPanelReducer;
  // const MapSearchResultsReducer = $window.reducers.MapSearchResultsReducer;
  // const MapClickLocationReducer = $window.reducers.MapClickLocationReducer;
  //
  // const detailReducers = {
  //   FETCH_DETAIL: DetailsReducer,
  //   SHOW_DETAIL: DetailsReducer,
  //   DETAIL_FULLSCREEN: DetailsReducer
  // };
  //
  // const mapSearchResultsReducers = {
  //   FETCH_MAP_SEARCH_RESULTS_FAILURE: MapSearchResultsReducer,
  //   FETCH_MAP_SEARCH_RESULTS_REQUEST: MapSearchResultsReducer,
  //   FETCH_MAP_SEARCH_RESULTS_SUCCESS: MapSearchResultsReducer
  // };
  //
  // const mapClickLocationReducers = {
  //   SET_MAP_CLICK_LOCATION: MapClickLocationReducer
  // };
  //
  const mapPreviewPanelReducers = {
    OPEN_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
    CLOSE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer,
    MAXIMIZE_MAP_PREVIEW_PANEL: MapPreviewPanelReducer
  };

  // TODO: Redux: replace
  // Warning: angular.merge is deprecated
  // -- https://docs.angularjs.org/api/ng/function/angular.merge
  // var actions = angular.merge(
  //   dataSelectionReducers,   // Done
  //   detailReducers,          // Done
  //   filtersReducers,         // Done
  //   homeReducers,            // Done
  //   mapPreviewPanelReducers, // Done
  //   mapSearchResultsReducers,
  //   mapClickLocationReducers,
  //   pageReducers,            // Done
  //   searchReducers,
  //   straatbeeldReducers,     // Done
  //   urlReducers,             // Done
  //   environment
  // );
  const actions = {
    ...DataSelectionReducer,
    ...DetailReducer,
    ...filtersReducers,
    ...homeReducer,
    ...mapPreviewPanelReducers,
    ...PageReducer,
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
