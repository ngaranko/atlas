import { all, fork } from 'redux-saga/effects';

import watchFetchMapBaseLayers from '../../map/sagas/layers/map-base-layers';
import watchFetchMapLayers from '../../map/sagas/layers/map-layers';
import watchFetchMapSearchResults from '../../map/sagas/search-results/map-search-results';
import watchFetchMapDetail from '../../map/sagas/detail/map-detail';
import watchFetchPanoPreview from '../../pano/sagas/preview/pano-preview';
import watchFetchSuggestions from '../../header/sagas/auto-suggest/auto-suggest';

export default function* rootSaga() {
  yield all([
    fork(watchFetchMapBaseLayers),
    fork(watchFetchMapLayers),
    fork(watchFetchMapSearchResults),
    fork(watchFetchMapDetail),
    fork(watchFetchPanoPreview),
    fork(watchFetchSuggestions)
  ]);
}
