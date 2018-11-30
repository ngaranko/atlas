import get from 'lodash.get';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import search from '../../../map/services/map-search/map-search';
import { getUser } from '../../../shared/ducks/user/user';
import {
fetchMapSearchResultsFailure,
fetchMapSearchResultsRequest,
fetchMapSearchResultsSuccess,
fetchSearchResultsByQuery} from '../../ducks/data-search/actions';
import { routing } from '../../../app/routes';
import { FETCH_MAP_SEARCH_RESULTS_REQUEST } from '../../ducks/data-search/constants';
import { getDataSearchLocation, getSearchQuery } from '../../ducks/data-search/selectors';

export function* fetchMapSearchResults() {
  const user = yield select(getUser);
  const location = yield select(getDataSearchLocation);
  try {
    const mapSearchResults = yield call(search, location, user);
    yield put(fetchMapSearchResultsSuccess(mapSearchResults));
  } catch (error) {
    yield put(fetchMapSearchResultsFailure(error));
  }
}

export function* fireMapSearchResultsRequest() {
  const location = yield select(getDataSearchLocation);
  if (location) {
    yield put(fetchMapSearchResultsRequest(location));
  }
}
export function* fireFetchSearchResultsByQuery(action) {
  const query = yield select(getSearchQuery);
  if (query && !get(action, 'meta.skipFetch')) {
    yield put(fetchSearchResultsByQuery(query));
  }
}

export default function* watchDataSearch() {
  yield takeLatest([
    FETCH_MAP_SEARCH_RESULTS_REQUEST
  ], fetchMapSearchResults);

  yield takeLatest([
    routing.map.type,
    routing.dataSearch.type
  ], fireMapSearchResultsRequest);

  yield takeLatest(routing.dataSearch.type, fireFetchSearchResultsByQuery);
}
