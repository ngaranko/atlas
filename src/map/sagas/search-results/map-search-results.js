import { call, put, takeLatest } from 'redux-saga/effects';

import search from '../../services/map-search';

function* fetchMapSearchResults(action) {
  try {
    const mapSearchResults = yield call(search, action.location, action.user);
    yield put({ type: 'FETCH_MAP_SEARCH_RESULTS_SUCCESS', mapSearchResults });
  } catch (error) {
    yield put({ type: 'FETCH_MAP_SEARCH_RESULTS_FAILURE', error });
  }
}

export default function* watchFetchMapSearchResults() {
  yield takeLatest('FETCH_MAP_SEARCH_RESULTS_REQUEST', fetchMapSearchResults);
}
