import { call, put, takeLatest } from 'redux-saga/effects';

import geoSearch from '../../services/map-geo-search';

function* fetchMapGeoSearch(action) {
  try {
    const mapResults = yield call(geoSearch, action.location);
    yield put({ type: 'FETCH_MAP_GEO_SEARCH_SUCCESS', mapResults });
  } catch (error) {
    console.log('catch error', error);
    yield put({ type: 'FETCH_MAP_GEO_SEARCH_FAILURE', error });
  }
}

export default function* watchFetchMapGeoSearch() {
  yield takeLatest('FETCH_MAP_GEO_SEARCH_REQUEST', fetchMapGeoSearch);
}
