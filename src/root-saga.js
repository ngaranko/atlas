import { all, fork } from 'redux-saga/effects';

import watchFetchPanoPreview from './pano/sagas/preview/pano-preview';
import watchFetchSuggestions from './header/sagas/auto-suggest/auto-suggest';
import watchDataSearch from './shared/sagas/data-search/data-search';
import watchFetchMapBaseLayers from './map/sagas/map-base-layers';
import watchFetchMapLayers from './map/sagas/map-layers';
import watchFetchMapPanelLayers from './map/sagas/map-panel-layers';
import watchFetchMapDetail from './map/sagas/detail';
import watchMapClick from './map/sagas/map-click';
import watchFetchNearestDetails from './map/sagas/nearest-details';
import {
  watchCloseStraatbeeld,
  watchFetchStraatbeeld,
  watchPanoramaRoute
} from './pano/sagas/panorama';
import { watchDetailRoute } from './detail/sagas/detail';
import watchFetchDataSelection from './shared/sagas/data-selection/data-selection';
import watchQueryActions from './store/query-synchronization';
import watchFetchDatasets from './shared/sagas/dataset/dataset';

export default function* rootSaga() {
  yield all([
    fork(watchFetchPanoPreview),
    fork(watchFetchSuggestions),
    fork(watchDataSearch),
    fork(watchFetchMapBaseLayers),
    fork(watchFetchMapLayers),
    fork(watchFetchMapPanelLayers),
    fork(watchFetchMapDetail),
    fork(watchFetchStraatbeeld),
    fork(watchCloseStraatbeeld),
    fork(watchMapClick),
    fork(watchFetchNearestDetails),
    fork(watchQueryActions),

    // route change watchers
    fork(watchDetailRoute),
    fork(watchPanoramaRoute),
    fork(watchFetchDataSelection),
    fork(watchFetchDatasets)
  ]);
}
