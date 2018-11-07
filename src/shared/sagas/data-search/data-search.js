import { call, put, select, takeLatest } from 'redux-saga/effects';
import search from '../../../map/services/map-search/map-search';
import { getUser } from '../../../shared/ducks/user/user';
import {
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  fetchMapSearchResultsFailure, fetchMapSearchResultsRequest,
  fetchMapSearchResultsSuccess,
  fetchSearchResultsByQuery,
  getDataSearchLocation
} from '../../ducks/data-search/data-search';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';
import { routing } from '../../../app/routes';

export function* fetchMapSearchResults(action) {
  try {
    const user = yield select(getUser);
    const mapSearchResults = yield call(search, action.payload, user);
    yield put(fetchMapSearchResultsSuccess(mapSearchResults));
  } catch (error) {
    yield put(fetchMapSearchResultsFailure(error));
  }
}

export function* fireGeoSearches() {
  const location = yield select(getDataSearchLocation);
  if (location) {
    yield put(getPanoPreview(location));
    yield put(fetchMapSearchResultsRequest(location));
  }
}
export function* fireFetchSearchResultsByQuery(action) {
  const location = yield select(getDataSearchLocation);
  if (!location) {
    // TODO: clean up logic
    const { meta = {} } = action;
    const { zoekterm } = meta.query;
    yield put(fetchSearchResultsByQuery(zoekterm));
  }
}

// export function* watchQuerySearch() {
//
// }

export default function* watchDataSearch() {
  yield takeLatest([
    FETCH_MAP_SEARCH_RESULTS_REQUEST
  ], fetchMapSearchResults);

  yield takeLatest(routing.dataSearch.type, fireFetchSearchResultsByQuery);

  // yield takeLatest([
  //   FETCH_SEARCH_RESULTS_BY_QUERY
  // ], );

  yield takeLatest([
    routing.map.type,
    routing.dataSearch.type
  ], fireGeoSearches);
}
