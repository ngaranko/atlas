import { put, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import { fetchStraatbeeldById } from '../../shared/ducks/straatbeeld/straatbeeld';

export function* fetchPanorma(action) {
  const id = action.payload.id;
  yield put(fetchStraatbeeldById(id));
}

export function* watchPanoramaRoute() {
  yield takeLatest(routing.panorama.type, fetchPanorma);
}
