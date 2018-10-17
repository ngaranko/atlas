import get from 'lodash.get';
import { put, takeLatest } from 'redux-saga/effects';
import { fetchDataSelection } from '../../header/ducks/search/search';
import { routing } from '../../app/routes';
import { APPLY_FILTERS } from '../../shared/ducks/filters/filters';

export function* fetchCatalogData(action) {
  const query = get(action, 'meta.query', {});
  if (query.filter_theme) {
    yield put({
      type: APPLY_FILTERS,
      payload: {
        groups: query.filter_theme
      }
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
