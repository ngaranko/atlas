import get from 'lodash.get';
import { put, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import { fetchDataSelection } from '../../shared/ducks/data-selection/data-selection';
import { applyFilters } from '../../shared/ducks/filters/filters';

export function* fetchCatalogData(action) {
  const query = get(action, 'meta.query', {});
  if (query.filter_theme) {
    yield put(applyFilters, {
      groups: query.filter_theme
    });
  }
  yield put(fetchDataSelection({
    dataset: 'dcatd',
    view: 'CATALOG',
    page: 1
  }));
}

export function* watchCatalogList() {
  yield takeLatest([
    routing.catalogus.type,
    routing.searchCatalog.type
  ], fetchCatalogData);
}
