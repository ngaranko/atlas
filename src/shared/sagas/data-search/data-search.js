import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUser } from '../../../shared/ducks/user/user';
import search from '../../../map/services/map-search/map-search';
import geosearch from '../../../shared/services/search/geosearch';
import {
  fetchMapSearchResultsFailure,
  fetchMapSearchResultsRequest,
  fetchMapSearchResultsSuccessList,
  fetchMapSearchResultsSuccessPanel,
  showSearchResults
} from '../../ducks/data-search/actions';
import { routing } from '../../../app/routes';
import {
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  SET_GEO_LOCATION,
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
import { getMapZoom } from '../../../map/ducks/map/map-selectors';
import ActiveOverlaysClass from '../../services/active-overlays/active-overlays';
import { waitForAuthentication } from '../user/user';

export function* fetchMapSearchResults() {
  const zoom = yield select(getMapZoom);
  const isMap = yield select(isMapPage);
  const location = yield select(getDataSearchLocation);

  try {
    yield call(waitForAuthentication);
    const user = yield select(getUser);
    if (isMap) {
      const mapSearchResults = yield call(search, location, user);
      yield put(fetchMapSearchResultsSuccessPanel(mapSearchResults));
    } else {
      const geoSearchResults = yield call(geosearch, location, user);
      const results = replaceBuurtcombinatie(geoSearchResults);
      yield put(fetchMapSearchResultsSuccessList(results, getNrOfSearchResults(geoSearchResults)));
    }
  } catch (error) {
    const payload = ActiveOverlaysClass.getOverlaysWarning(zoom);
    yield put(fetchMapSearchResultsFailure(payload));
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
  yield call(waitForAuthentication);
  const user = yield select(getUser);
  if (isQuery) {
    if (isString(category) && category.length) {
      const results = yield vanillaSearch(query, category, user);
      yield call(setSearchResults, results);
    } else {
      const results = yield vanillaSearch(query, undefined, user);
      yield call(setSearchResults, results);
    }
  }
}

export function* fireSearchResultsRequest() {
  const location = yield select(getDataSearchLocation);
  const query = yield select(getSearchQuery);
  const category = yield select(getSearchCategory);
  const isMap = yield select(isMapPage);
  // Todo: refactor the reducer, so we don't have this conditional statement
  if (location) {
    yield put(fetchMapSearchResultsRequest(location, isMap));
  } else if (query) {
    yield call(fetchQuerySearchResults, query, category);
  }
}

export default function* watchDataSearch() {
  yield takeLatest([
    FETCH_MAP_SEARCH_RESULTS_REQUEST
  ], fetchMapSearchResults);

  yield takeLatest([
    SET_GEO_LOCATION,
    SET_QUERY_CATEGORY,
    routing.map.type,
    routing.dataSearch.type,
    routing.searchDatasets.type
  ], fireSearchResultsRequest);
}
