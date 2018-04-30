import { all, fork } from 'redux-saga/effects';

import watchFetchMapBaseLayers from './map-base-layers';
import watchFetchMapLayers from './map-layers';
import watchFetchMapPanelLayers from './map-panel-layers';
import watchFetchMapSearchResults from './search-results/map-search-results';
import watchFetchMapDetail from './detail';
import watchFetchPanoPreview from '../../pano/sagas/preview/pano-preview';
import watchMapClick from './map-click';
import watchFetchNearestDetails from './nearest-details';
import watchGeoSearchRequest from './geosearch';

export default function* rootSaga() {
  yield all([
    fork(watchFetchMapBaseLayers),
    fork(watchFetchMapLayers),
    fork(watchFetchMapPanelLayers),
    fork(watchFetchMapSearchResults),
    fork(watchFetchMapDetail),
    fork(watchFetchPanoPreview),
    fork(watchMapClick),
    fork(watchFetchNearestDetails),
    fork(watchGeoSearchRequest)
  ]);
}
