import get from 'lodash.get';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUser } from '../../../shared/ducks/user/user';
import search from '../../../map/services/map-search/map-search';
import geosearch from '../../../shared/services/search/geosearch';
import {
  fetchMapSearchResultsFailure,
  fetchMapSearchResultsRequest,
  fetchMapSearchResultsSuccessList,
  fetchMapSearchResultsSuccessPanel,
  fetchSearchResultsByQuery,
  showSearchResults
} from '../../ducks/data-search/actions';
import { routing } from '../../../app/routes';
import {
  FETCH_MAP_SEARCH_RESULTS_REQUEST, SET_GEO_LOCATION,
  SET_QUERY_CATEGORY
} from '../../ducks/data-search/constants';
import {
  getDataSearchLocation,
  getSearchCategory,
  getSearchQuery
} from '../../ducks/data-search/selectors';
import {
  getNumberOfResults as getNrOfSearchResults,
  replaceBuurtcombinatie,
  search as vanillaSearch
} from '../../services/search/search';
import { isMapPage } from '../../../store/redux-first-router';

export function* fetchMapSearchResults(action) {
  const user = yield select(getUser);
  const location = yield select(getDataSearchLocation);
  try {
    if (get(action, 'meta.isMap')) {
      const mapSearchResults = yield call(search, location, user);
      yield put(fetchMapSearchResultsSuccessPanel(mapSearchResults));
    } else {
      const otherGeoSearchResults = yield call(geosearch, location, user);
      const otherResults = replaceBuurtcombinatie(otherGeoSearchResults);
      yield put(fetchMapSearchResultsSuccessList(otherResults, '', getNrOfSearchResults(otherGeoSearchResults)));
    }
  } catch (error) {
    yield put(fetchMapSearchResultsFailure(error));
  }
}

function isString(value) {
  return typeof value === 'string';
}

function* setSearchResults(searchResults) {
  const numberOfResults = getNrOfSearchResults(searchResults);
  const query = yield select(getSearchQuery);
  const result = replaceBuurtcombinatie(searchResults);

  yield put(showSearchResults(result, query, numberOfResults));
}

function* fetchQuerySearchResults(query, category) {
  const isQuery = isString(query);
  const user = yield select(getUser);
  const userAuthScope = undefined; // user.scopes.includes(endpoint.authScope);
  if (isQuery) {
    if (isString(category) && category.length) {
      const results = yield vanillaSearch(query, category, userAuthScope);
      yield call(setSearchResults, results);
    } else {
      const results = yield vanillaSearch(query);
      yield call(setSearchResults, results);
    }
  }
}

export function* fireSearchResultsRequest() {
  const location = yield select(getDataSearchLocation);
  const query = yield select(getSearchQuery);
  const category = yield select(getSearchCategory);
  const isMap = yield select(isMapPage);
  if (location) {
    yield put(fetchMapSearchResultsRequest(location, isMap));
  } else if (query) {
    yield call(fetchQuerySearchResults, query, category);
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
    SET_QUERY_CATEGORY,
    SET_GEO_LOCATION,
    routing.map.type,
    routing.dataSearch.type
  ], fireSearchResultsRequest);

  yield takeLatest(routing.dataSearch.type, fireFetchSearchResultsByQuery);
}
