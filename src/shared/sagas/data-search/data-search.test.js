import { testSaga } from 'redux-saga-test-plan';
import {
  fetchMapSearchResultsFailure,
  fetchMapSearchResultsSuccess
} from '../../../shared/ducks/data-search/data-search';
import { fetchMapSearchResults } from './data-search';
import search from '../../../map/services/map-search/map-search';

describe('fetchMapSearchResults', () => {
  it('should dispatch the correct action', () => {
    testSaga(fetchMapSearchResults, {})
      .next()
      .next('user')
      .next('location')
      .call(search, 'location', 'user')
      .next('results')
      .put(fetchMapSearchResultsSuccess('results'))
      .next()
      .isDone();
  });

  it('should throw error and put error', () => {
    const error = new Error('My Error');
    testSaga(fetchMapSearchResults, {})
      .next() // skip select
      .next() // skip select
      .next()
      .throw(error)
      .put(fetchMapSearchResultsFailure(error))
      .next()
      .isDone();
  });
});
