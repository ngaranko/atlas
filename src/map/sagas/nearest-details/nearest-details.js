import { call, put, takeLatest } from 'redux-saga/effects';
import fetchNearestDetail from '../../services/nearest-detail/nearest-detail';
import { REQUEST_NEAREST_DETAILS } from '../../../shared/ducks/data-search/constants';
import { toDetailFromEndpoint } from '../../../store/redux-first-router/actions';
import { goToGeoSearch } from '../map-click/map-click';

export function* fetchNearestDetails(action) {
  const {
    location,
    layers,
    zoom,
    view
  } = action.payload;
  try {
    const { uri } = yield call(fetchNearestDetail, location, layers, zoom);
    if (uri) {
      yield put(toDetailFromEndpoint(uri, view));
    } else {
      yield call(goToGeoSearch, location);
    }
  } catch (error) {
    yield call(goToGeoSearch, location);
  }
}

export default function* watchFetchNearestDetails() {
  yield takeLatest(REQUEST_NEAREST_DETAILS, fetchNearestDetails);
}
