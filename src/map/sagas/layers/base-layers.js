import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../services';

function* fetchBaseLayers() {
  try {
    const baseLayers = yield call(api.getBaseLayers);
    yield put({ type: 'FETCH_BASE_LAYERS_SUCCESS', baseLayers });
  } catch (error) {
    yield put({ type: 'FETCH_BASE_LAYERS_FAILURE', error });
  }
}

export default function* watchFetchBaseLayers() {
  yield takeLatest('FETCH_BASE_LAYERS_REQUEST', fetchBaseLayers);
}
