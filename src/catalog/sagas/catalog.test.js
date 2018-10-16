import { put, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import { fetchDataSelection } from '../../header/ducks/search/search';
import { fetchCatalogData, watchCatalogList } from './catalog';

it('should dispatch fetch data on route change', () => {
  const watchGen = watchCatalogList();
  expect(watchGen.next().value).toEqual(
    takeLatest([
      routing.catalogus.type,
      routing.searchCatalog.type
    ], fetchCatalogData)
  );

  const fetchGen = fetchCatalogData();
  expect(fetchGen.next().value).toEqual(
    put(
      fetchDataSelection({
        dataset: 'dcatd',
        view: 'CATALOG',
        page: 1
      })
    )
  );
});
