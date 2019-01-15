import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import {
  fetchPanoramaError,
  fetchPanoramaRequest,
  fetchPanoramaSuccess
} from '../../panorama/ducks/actions';
import {
  CLOSE_PANORAMA,
  FETCH_PANORAMA_REQUEST,
  FETCH_PANORAMA_HOTSPOT_REQUEST,
  FETCH_PANORAMA_SUCCESS,
  FETCH_PANORAMA_REQUEST_TOGGLE,
  SET_PANORAMA_LOCATION,
  SET_PANORAMA_YEAR
} from '../../panorama/ducks/constants';
import {
  getPanoramaHistory,
  getPanoramaId,
  getPanoramaLocation
} from '../../panorama/ducks/selectors';
import { toggleMapOverlayPanorama } from '../../map/ducks/map/map';
import { getImageDataById, getImageDataByLocation } from '../services/panorama-api/panorama-api';
import { toMap, toPanorama } from '../../store/redux-first-router/actions';

export function* fireFetchPanormaRequest(action) {
  yield put(fetchPanoramaRequest(action.payload));
}

export function* handlePanoramaRequest(fn, idOrLocation) {
  const history = yield select(getPanoramaHistory);
  try {
    const imageData = yield call(fn, idOrLocation, history);
    yield put(fetchPanoramaSuccess(imageData));
    yield put(toggleMapOverlayPanorama(history));
  } catch (error) {
    yield put(fetchPanoramaError(error));
  }
}

export function* fetchPanoramaById() {
  const id = yield select(getPanoramaId);
  yield call(handlePanoramaRequest, getImageDataById, id);
}

export function* fetchPanoramaByLocation() {
  const location = yield select(getPanoramaLocation);
  yield call(handlePanoramaRequest, getImageDataByLocation, location);
}

export function* setPanoramaId(action) {
  const id = yield select(getPanoramaId);
  if (action.payload.id !== id) {
    yield put(toPanorama(action.payload.id));
  }
}

export function* watchFetchPanorama() {
  yield all([
    takeLatest(FETCH_PANORAMA_REQUEST, fetchPanoramaById),
    takeLatest(FETCH_PANORAMA_HOTSPOT_REQUEST, fetchPanoramaById),
    takeLatest(FETCH_PANORAMA_SUCCESS, setPanoramaId),
    takeLatest([
      SET_PANORAMA_YEAR,
      SET_PANORAMA_LOCATION,
      FETCH_PANORAMA_REQUEST_TOGGLE
    ], fetchPanoramaByLocation)
  ]);
}

export function* doClosePanorama() {
  yield put(toMap());
}

export function* watchPanoramaRoute() {
  yield takeLatest(routing.panorama.type, fireFetchPanormaRequest);
}

export function* watchClosePanorama() {
  yield takeLatest(CLOSE_PANORAMA, doClosePanorama);
}
