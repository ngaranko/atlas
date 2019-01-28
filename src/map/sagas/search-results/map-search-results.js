import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS
} from '../../ducks/search-results/map-search-results';
import search from '../../services/map-search/map-search';

export function* fetchMapSearchResults(action) {
  try {
    const mapSearchResults = yield call(search, action.location, action.user);
    yield put({
      type: FETCH_MAP_SEARCH_RESULTS_SUCCESS,
      location: action.location,
      mapSearchResults
    });
  } catch (error) {
    yield put({ type: FETCH_MAP_SEARCH_RESULTS_FAILURE, error });
  }
}

export default function* watchFetchMapSearchResults() {
  yield takeLatest(FETCH_MAP_SEARCH_RESULTS_REQUEST, fetchMapSearchResults);
}
