import { all, fork } from 'redux-saga/effects';

import watchFetchMapBaseLayers from './layers/map-base-layers';
import watchFetchMapLayers from './layers/map-layers';

export default function* rootSaga() {
  yield all([
    fork(watchFetchMapBaseLayers),
    fork(watchFetchMapLayers)
  ]);
}
