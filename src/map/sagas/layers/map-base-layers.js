import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../services';

function* fetchMapBaseLayers() {
  try {
    const mapBaseLayers = yield call(api.getMapBaseLayers);
    yield put({ type: 'FETCH_MAP_BASE_LAYERS_SUCCESS', mapBaseLayers });
  } catch (error) {
    yield put({ type: 'FETCH_MAP_BASE_LAYERS_FAILURE', error });
  }
}

export default function* watchFetchMapBaseLayers() {
  yield takeLatest('FETCH_MAP_BASE_LAYERS_REQUEST', fetchMapBaseLayers);
}
