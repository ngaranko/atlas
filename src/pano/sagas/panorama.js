import get from 'lodash.get';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import {
  FETCH_STRAATBEELD,
  fetchStraatbeeldById, getStraatbeeld, setStraatbeeld
} from '../../shared/ducks/straatbeeld/straatbeeld';
import { getImageDataById } from '../../shared/services/straatbeeld-api/straatbeeld-api';

export function* fireFetchPanormaRequest(action) {
  const id = action.payload.id;
  // const heading = get(action, 'meta.query.heading');
  yield put(fetchStraatbeeldById(id));
}

export function* watchPanoramaRoute() {
  yield takeLatest(routing.panorama.type, fireFetchPanormaRequest);
}

export function* fetchPanorama() {
  const { id, year } = yield select(getStraatbeeld);
  const imageData = yield call(getImageDataById, id, year);
  yield put(setStraatbeeld(imageData));
}

export function* watchFetchStraatbeeld() {
  yield takeLatest(FETCH_STRAATBEELD, fetchPanorama);
}
