import { call, put, select, takeLatest } from 'redux-saga/effects';
import fetchNearestDetail from '../../services/nearest-detail/nearest-detail';
import { DETAIL_VIEW } from '../../../shared/ducks/detail/detail';
import { REQUEST_GEOSEARCH, REQUEST_NEAREST_DETAILS } from '../geosearch/geosearch';
import { getPageActionEndpoint } from '../../../store/redux-first-router';
import { VIEWS } from '../../../shared/ducks/data-selection/constants';
import { getDataSelectionView } from '../../../shared/ducks/data-selection/selectors';

export function* fetchNearestDetails(action) {
  const {
    location,
    layers,
    zoom
  } = action.payload;
  try {
    const { uri } = yield call(fetchNearestDetail, location, layers, zoom);
    if (uri) {
      const currentView = yield select(getDataSelectionView);
      const view = currentView === VIEWS.MAP ? DETAIL_VIEW.MAP : DETAIL_VIEW.MAP_DETAIL;
      yield put(getPageActionEndpoint(uri, view));
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
