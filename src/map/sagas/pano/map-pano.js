import { call, put, takeLatest } from 'redux-saga/effects';

import pano from '../../services/map-pano';

function* fetchMapPano(action) {
  try {
    const panoResult = yield call(pano, action.location);
    yield put({ type: 'FETCH_MAP_PANO_SUCCESS', panoResult });
  } catch (error) {
    yield put({ type: 'FETCH_MAP_PANO_FAILURE', error });
  }
}

export default function* watchFetchMapPano() {
  yield takeLatest('FETCH_MAP_PANO_REQUEST', fetchMapPano);
}
