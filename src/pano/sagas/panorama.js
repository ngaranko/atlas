import { call, put, select, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import {
  FETCH_STRAATBEELD,
  fetchStraatbeeld,
  getStraatbeeld,
  fetchStraatbeeldSuccess,
  fetchStraatbeeldError,
  CLOSE_STRAATBEELD
} from '../../shared/ducks/straatbeeld/straatbeeld';
import { getImageDataById } from '../../shared/services/straatbeeld-api/straatbeeld-api';
import { toMapAndPreserveQuery } from '../../store/redux-first-router';

function* fireFetchPanormaRequest(action) {
  yield put(fetchStraatbeeld(action.payload.id));
}

export function* watchPanoramaRoute() {
  yield takeLatest(routing.panorama.type, fireFetchPanormaRequest);
}

function* fetchPanorama() {
  const { id, year } = yield select(getStraatbeeld);
  try {
    const imageData = yield call(getImageDataById, id, year);
    yield put(fetchStraatbeeldSuccess(imageData));
  } catch (error) {
    yield put(fetchStraatbeeldError(error));
  }
}

export function* watchFetchStraatbeeld() {
  yield takeLatest(FETCH_STRAATBEELD, fetchPanorama);
}

function* doCloseStraatbeeld() {
  yield put(toMapAndPreserveQuery());
}

export function* watchCloseStraatbeeld() {
  yield takeLatest(CLOSE_STRAATBEELD, doCloseStraatbeeld);
}
