import {
  FETCH_DATA_SELECTION,
  FETCH_SEARCH_RESULTS_BY_QUERY,
  fetchDataSelection,
  fetchSearchResultsByQuery
} from './search';

describe('Search actions', () => {
  it('fetchDataSelection', () => {
    expect(fetchDataSelection('query')).toEqual({
      type: {
        id: FETCH_DATA_SELECTION
      },
      payload: 'query'
    });
  });

  it('fetchSearchResultsByQuery', () => {
    expect(fetchSearchResultsByQuery('query')).toEqual({
      type: {
        id: FETCH_SEARCH_RESULTS_BY_QUERY
      },
      payload: 'query'
    });
  });
});
