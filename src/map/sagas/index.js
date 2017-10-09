import { all, fork } from 'redux-saga/effects';

import watchFetchMapLayers from './layers/map-layers';

export default function* rootSaga() {
  yield all([
    fork(watchFetchMapLayers)
  ]);
}
