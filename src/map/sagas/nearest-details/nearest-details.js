import { call, put, takeLatest } from 'redux-saga/effects';

import fetchNearestDetail, { getResult } from '../../services/nearest-detail/nearest-detail';

import ACTIONS from '../../../shared/actions';

function* fetchNearestDetails(action) {
  const {
    location,
    layers,
    zoom
  } = action.payload;
  try {
    const results = yield call(fetchNearestDetail, location, layers, zoom);
    const foundResult = getResult(results);
    if (foundResult.id) {
      yield put({
        type: ACTIONS.MAP_HIGHLIGHT,
        payload: false
      });
      yield put({
        type: ACTIONS.FETCH_DETAIL,
        payload: foundResult.uri,
        skippedSearchResults: true
      });
    } else {
      yield put({
        type: 'REQUEST_GEOSEARCH',
        payload: [location.latitude, location.longitude]
      });
    }
  } catch (error) {
    yield put({
      type: 'REQUEST_GEOSEARCH',
      payload: [location.latitude, location.longitude]
    });
  }
}

export default function* watchFetchNearestDetails() {
  yield takeLatest('REQUEST_NEAREST_DETAILS', fetchNearestDetails);
}
