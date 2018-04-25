import { all, fork } from 'redux-saga/effects';

import watchFetchMapBaseLayers from './map-base-layers';
import watchFetchMapLayers from './map-layers';
import watchFetchMapPanelLayers from './map-panel-layers';
import watchFetchMapSearchResults from './search-results/map-search-results';
import watchFetchMapDetail from './detail/map-detail';
import watchFetchPanoPreview from '../../pano/sagas/preview/pano-preview';
import watchMapClick, { watchFetchNearestDetails } from './map/map';

export default function* rootSaga() {
  yield all([
    fork(watchFetchMapBaseLayers),
    fork(watchFetchMapLayers),
    fork(watchFetchMapPanelLayers),
    fork(watchFetchMapSearchResults),
    fork(watchFetchMapDetail),
    fork(watchFetchPanoPreview),
    fork(watchMapClick),
    fork(watchFetchNearestDetails)
  ]);
}
