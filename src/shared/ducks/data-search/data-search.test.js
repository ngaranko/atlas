import reducer, {
  REDUCER_KEY,
  getMapResultsByLocation,
  getSearchQuery,
  isSearchActive,
  fetchMapSearchResultsRequest,
  fetchMapSearchResultsSuccess, fetchMapSearchResultsFailure
} from './data-search';

describe('mapSearch reducer', () => {
  it('sets the initial state', () => {
    expect(reducer(undefined, { type: 'UNKOWN' })).toMatchSnapshot();
  });

  it('handles search results request', () => {
    const action = fetchMapSearchResultsRequest({
      latitude: 52.3637006,
      longitude: 4.7943446
    });
    expect(reducer({}, action)).toMatchSnapshot();
  });

  it('handles search results success', () => {
    const action = fetchMapSearchResultsSuccess([{ foo: 'bar' }]);
    expect(reducer({}, action)).toMatchSnapshot();
  });

  it('should handle search failure', () => {
    expect(reducer({}, fetchMapSearchResultsFailure('error'))).toEqual({
      isLoading: false,
      error: 'error'
    });
  });
});

describe('data-search selectors', () => {
  it('getSearchQuery', () => {
    const state = {
      [REDUCER_KEY]: {
        query: 'foo'
      }
    };
    expect(getSearchQuery(state)).toEqual(state[REDUCER_KEY].query);
  });

  describe('getMapResultsByLocation', () => {
    it('should return state.mapSearchResultsByLocation as a array', () => {
      const state = {
        [REDUCER_KEY]: {
          mapSearchResultsByLocation: []
        }
      };
      expect(getMapResultsByLocation(state)).toEqual(state[REDUCER_KEY].mapSearchResultsByLocation);
    });
  });

  describe('isSearchActive', () => {
    it('should return state.search.location as a number: > 0', () => {
      const mockParameters = {
        location: [10, 10]
      };
      const selected = isSearchActive.resultFunc(mockParameters);
      expect(selected).toEqual(mockParameters.location.length);
    });

    it('should return state.search.location as a number: 0', () => {
      const mockParameters = {
        location: []
      };
      const selected = isSearchActive.resultFunc(mockParameters);
      expect(selected).toEqual(mockParameters.location.length);
    });
  });
});
