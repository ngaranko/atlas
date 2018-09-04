import { combineReducers } from 'redux';

import AutoSuggestReducer from '../header/ducks/auto-suggest/auto-suggest';
import DataSelectionReducer from '../shared/ducks/data-selection/data-selection';
import DataSelectionCatalogReducer from '../catalog/ducks/data-selection/data-selection-catalog';
import ErrorMessageReducer from '../shared/ducks/error-message';
import PageReducer from '../shared/ducks/page/page';
import UiReducer from '../shared/ducks/ui/ui';
import UserReducer from './user';
import StraatbeeldReducer from '../shared/ducks/straatbeeld/straatbeeld';
import deprecatedReducer from './deprecated/deprecated-reducer';

// eslint-disable-next-line max-params

const rootReducer = (oldState, action) => { // eslint-disable-line complexity
  // Run state changes based on old reducers
  const deprecatedState = deprecatedReducer(oldState, action);

  // const MapPanelLayersReducer = $window.reducers.PanelLayersReducer;
  // const MapLayersReducer = $window.reducers.MapLayersReducer;
  // const MapBaseLayersReducer = $window.reducers.MapBaseLayersReducer;
  // const MapReducer = $window.reducers.MapReducer;
  //
  // const mapLayers = combineReducers({
  //     layers: MapLayersReducer,
  //     baseLayers: MapBaseLayersReducer,
  //     panelLayers: MapPanelLayersReducer
  // });
  //
  // // Use combine reducer for new reducers
  // const ErrorMessageReducer = $window.reducers.ErrorMessageReducer;
  // const MapDetailReducer = $window.reducers.MapDetailReducer;
  // const PanoPreviewReducer = $window.reducers.PanoPreviewReducer;
  // const UiReducer = $window.reducers.UiReducer;                                      // DONE
  // const DataSelectionReducer = $window.reducers.DataSelectionReducer;                // DONE
  // const PageReducer = $window.reducers.PageReducer;                                  // DONE
  // const StraatbeeldReducer = $window.reducers.StraatbeeldReducer;                    // DONE
  // const UserReducer = $window.reducers.UserReducer;                                  // DONE
  // const autoSuggestReducer = $window.reducers.AutoSuggestReducer;                    // DONE
  // const DataSelectionCatalogReducer = $window.reducers.DataSelectionCatalogReducer;  // DONE
  const newRootReducer = combineReducers({
    dataSelection: DataSelectionReducer,
    page: PageReducer,
    error: ErrorMessageReducer,
    //     map: MapReducer,
    //     mapDetail: MapDetailReducer,
    //     pano: PanoPreviewReducer,
    straatbeeld: StraatbeeldReducer,
    ui: UiReducer,
    user: UserReducer,
    //     mapLayers,
    autoSuggest: AutoSuggestReducer,
    catalogFilters: DataSelectionCatalogReducer
  });
  const filteredState = {
    dataSelection: deprecatedState.dataSelection,
    page: deprecatedState.page,
    //     map: deprecatedState.map,
    //     mapDetail: deprecatedState.mapDetail,
    straatbeeld: deprecatedState.straatbeeld,
    ui: deprecatedState.ui,
    user: deprecatedState.user,

    //     // Using oldState instead of chaining deprecatedState from
    //     // other reducer for the following fields.
    //     // This is because these fields do not recide in the URL state,
    //     // the URL resolution step in the deprecatedReducer would
    //     // therefore reset these fields in the state.
    error: oldState.error,
    //     pano: oldState.pano,
    //     mapLayers: oldState.mapLayers,
    autoSuggest: oldState.autoSuggest,
    catalogFilters: oldState.catalogFilters
  };

  // // Combine old and new reducer states
  const newState = {
    ...deprecatedState,
    ...newRootReducer(filteredState, action)
  };

  return newState;
};

export default rootReducer;
