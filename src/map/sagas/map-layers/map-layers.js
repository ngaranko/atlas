import { call, put, takeLatest } from 'redux-saga/effects';

import { getMapLayers } from '../../services';

export function* fetchMapLayers() {
  try {
    const mapLayers = yield call(getMapLayers);
    yield put({ type: 'FETCH_MAP_LAYERS_SUCCESS', mapLayers });
  } catch (error) {
    yield put({ type: 'FETCH_MAP_LAYERS_FAILURE', error });
  }
}

export default function* watchFetchMapLayers() {
  yield takeLatest('FETCH_MAP_LAYERS_REQUEST', fetchMapLayers);
}
