import { expectSaga, testSaga } from 'redux-saga-test-plan';

import watchFetchCatalogFilters, { fetchCatalogFilters } from './data-selection';
import {
  FETCH_CATALOG_FILTERS_FAILURE,
  FETCH_CATALOG_FILTERS_REQUEST,
  FETCH_CATALOG_FILTERS_SUCCESS
} from '../../ducks/data-selection/data-selection-catalog';
import fetchFilters from '../../services/catalog-filters';

describe('watchFetchCatalogFilters', () => {
  const action = { type: FETCH_CATALOG_FILTERS_REQUEST };

  it(`should watch ${FETCH_CATALOG_FILTERS_REQUEST} and call fetchFilters`, () => {
    testSaga(watchFetchCatalogFilters)
      .next()
      .takeLatestEffect(FETCH_CATALOG_FILTERS_REQUEST, fetchCatalogFilters)
      .next(action)
      .isDone();
  });
});

describe('fetchCatalogFilters', () => {
  it('should dispatch the correct action', () => (
    expectSaga(fetchCatalogFilters)
      .provide({
        call(effect, next) {
          return effect.fn === fetchFilters ? 'payload' : next();
        }
      })
      .put({
        type: FETCH_CATALOG_FILTERS_SUCCESS,
        payload: 'payload'
      })
      .run()
  ));

  it('should throw error and put error', () => {
    const error = new Error('My Error');
    testSaga(fetchCatalogFilters)
      .next()
      .throw(error)
      .put({ type: FETCH_CATALOG_FILTERS_FAILURE, error })
      .next()
      .isDone();
  });
});
