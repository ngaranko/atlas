import { call, put, takeLatest } from 'redux-saga/effects';
import fetchNearestDetail from '../../services/nearest-detail/nearest-detail';
import { DETAIL_VIEW } from '../../../shared/ducks/detail/detail';
import { REQUEST_GEOSEARCH, REQUEST_NEAREST_DETAILS } from '../geosearch/geosearch';
import { toDataDetail } from '../../../store/redux-first-router';

export function* fetchNearestDetails(action) {
  const {
    location,
    layers,
    zoom
  } = action.payload;
  try {
    const { uri, id } = yield call(fetchNearestDetail, location, layers, zoom);
    if (uri) {
      // Todo: DP-6288 have to figure out where to get strings (brk, object) from
      yield put(toDataDetail(id, 'brk', 'object', DETAIL_VIEW.MAP));
    } else {
      yield put({
        type: REQUEST_GEOSEARCH,
        payload: [location.latitude, location.longitude]
      });
    }
  } catch (error) {
    yield put({
      type: REQUEST_GEOSEARCH,
      payload: [location.latitude, location.longitude]
    });
  }
}

export default function* watchFetchNearestDetails() {
  yield takeLatest(REQUEST_NEAREST_DETAILS, fetchNearestDetails);
}
