import { all, fork } from 'redux-saga/effects';

import watchFetchBaseLayers from './layers/base-layers';
import watchFetchMapLayers from './layers/map-layers';

export default function* rootSaga() {
  yield all([
    fork(watchFetchBaseLayers),
    fork(watchFetchMapLayers)
  ]);
}
