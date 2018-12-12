import { call, put, select, takeLatest } from 'redux-saga/effects';
import fetchNearestDetail from '../../services/nearest-detail/nearest-detail';
import { REQUEST_NEAREST_DETAILS } from '../geosearch/geosearch';
import { getPageActionEndpoint } from '../../../store/redux-first-router';
import { getDetailView } from '../../../shared/ducks/detail/selectors';
import { setGeoLocation } from '../../../shared/ducks/data-search/actions';

export function* fetchNearestDetails(action) {
  const {
    location,
    layers,
    zoom
  } = action.payload;
  try {
    const { uri } = yield call(fetchNearestDetail, location, layers, zoom);
    if (uri) {
      const view = yield select(getDetailView);
      yield put(getPageActionEndpoint(uri, view));
    } else {
      yield put(setGeoLocation(location));
    }
  } catch (error) {
    yield put(setGeoLocation(location));
  }
}

export default function* watchFetchNearestDetails() {
  yield takeLatest(REQUEST_NEAREST_DETAILS, fetchNearestDetails);
}
