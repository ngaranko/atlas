import { expectSaga, testSaga } from 'redux-saga-test-plan';
import watchFetchMapSearchResults, { fetchMapSearchResults } from './map-search-results';
import {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS
} from '../../ducks/search-results/map-search-results';
import search from '../../services/map-search/map-search';

describe('watchFetchMapSearchResults', () => {
  it(`should watch ${FETCH_MAP_SEARCH_RESULTS_FAILURE} and call fetchFilters`, () => {
    const action = { type: FETCH_MAP_SEARCH_RESULTS_SUCCESS };
    testSaga(watchFetchMapSearchResults)
      .next()
      .takeLatestEffect(FETCH_MAP_SEARCH_RESULTS_REQUEST, fetchMapSearchResults)
      .next(action)
      .isDone();
  });
});

describe('fetchMapSearchResults', () => {
  it('should dispatch the correct action', () => (
    expectSaga(fetchMapSearchResults, { location: '', user: '' })
      .provide({
        call(effect, next) {
          return effect.fn === search ? 'payload' : next();
        }
      })
      .put({
        type: FETCH_MAP_SEARCH_RESULTS_SUCCESS,
        location: '',
        mapSearchResults: 'payload'
      })
      .run()
  ));

  it('should throw error and put error', () => {
    const error = new Error('My Error');
    testSaga(fetchMapSearchResults, {})
      .next()
      .throw(error)
      .put({ type: FETCH_MAP_SEARCH_RESULTS_FAILURE, error })
      .next()
      .isDone();
  });
});
