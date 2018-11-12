import {
  FETCH_DATA_SELECTION,
  fetchDataSelection
} from './search';

describe('Search actions', () => {
  it('fetchDataSelection', () => {
    expect(fetchDataSelection('query')).toEqual({
      type: FETCH_DATA_SELECTION,
      payload: 'query'
    });
  });
});
