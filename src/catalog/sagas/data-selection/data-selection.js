import { call, put, takeLatest } from 'redux-saga/effects';
import fetchFilters from '../../services/catalog-filters';
import { FETCH_CATALOG_FILTERS_SUCCESS, FETCH_CATALOG_FILTERS_FAILURE } from '../../ducks/data-selection/data-selection-catalog';

export function* fetchCatalogFilters() {
  try {
    const filters = yield call(fetchFilters);
    yield put({
      type: FETCH_CATALOG_FILTERS_SUCCESS,
      payload: filters
    });
  } catch (error) {
    yield put({ type: FETCH_CATALOG_FILTERS_FAILURE, error });
  }
}

export default function* watchFetchCatalogFilters() {
  yield takeLatest('FETCH_CATALOG_FILTERS_REQUEST', fetchCatalogFilters);
}
