import reducer, {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_BY_LOCATION,
  FETCH_SEARCH_RESULTS_BY_QUERY,
  FETCH_SEARCH_RESULTS_CATEGORY,
  getMapResultsByLocation,
  getMapSearchResults,
  getSearch,
  isSearchActive,
  SHOW_SEARCH_RESULTS
} from './data-search';

describe('mapSearch reducer', () => {
  it('sets the initial state', () => {
    expect(reducer(undefined, { type: 'UNKOWN' })).toMatchSnapshot();
  });

  it('handles search results request', () => {
    const action = getMapSearchResults({
      latitude: 52.3637006,
      longitude: 4.7943446
    }, { name: 'does not matter' });
    expect(reducer({}, action)).toMatchSnapshot();
  });

  it('handles search results success', () => {
    const action = {
      type: FETCH_MAP_SEARCH_RESULTS_SUCCESS,
      location: {
        latitude: 52.3637006,
        longitude: 4.7943446
      },
      mapSearchResults: [{ foo: 'bar' }]
    };
    expect(reducer({}, action)).toMatchSnapshot();
  });

  it('should handle search failure', () => {
    expect(reducer({}, {
      type: FETCH_MAP_SEARCH_RESULTS_FAILURE
    })).toEqual({
      isLoading: false
    });
  });
});

describe('mapSearch Selectors', () => {
  describe('getSearch', () => {
    it('should return state.search as a object', () => {
      const mockParameters = { search: {} };
      expect(getSearch(mockParameters)).toEqual(mockParameters.search);
    });

    it('should return state.search undefined', () => {
      const mockParameters = {};
      expect(getSearch(mockParameters)).toEqual();
    });
  });

  describe('getMapResultsByLocation', () => {
    it('should return state.mapSearchResultsByLocation as a array', () => {
      const mockParameters = {
        mapSearchResultsByLocation: []
      };
      const selected = getMapResultsByLocation(mockParameters);
      expect(selected).toEqual(mockParameters.mapSearchResultsByLocation);
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

  // describe('getSearchMarker', () => { // TODO: refactor, move and use or remove
  //   it('should return an array of searchMarkers', () => {
  //     const getShortSelectedLocationMock = { latitude: 10, longitude: 10 };
  //     const selected = getSearchMarker.resultFunc(getShortSelectedLocationMock);
  //     expect(selected).toEqual([{ position: [10, 10], type: 'geoSearchType' }]);
  //   });
  //
  //   it('should return an empty array', () => {
  //     const isSearchActiveMock = 0;
  //     const getSearchMock = {
  //       location: []
  //     };
  //     const selected = getSearchMarker.resultFunc(isSearchActiveMock, getSearchMock);
  //     expect(selected).toEqual([]);
  //   });
  // });

//   describe('selectLatestMapSearchResults', () => { // TODO: refactor, move and use or remove
//     it('should return an array of results', () => {
//       const getMapResultsByLocationMock = {
//         '123,456': [
//           { id: 'resultMock1' }
//         ],
//         '789,1011': [
//           { id: 'resultMock2' }
//         ]
//       };
//       const getLocationIdMock = '123,456';
//       const selected = selectLatestMapSearchResults.resultFunc(
//         getLocationIdMock, getMapResultsByLocationMock
//       );
//       expect(selected).toBe(getMapResultsByLocationMock['123,456']);
//     });
//
//     it('should return undefined', () => {
//       const getMapResultsByLocationMock = {};
//       const getSearchMock = {
//         location: [10, 10]
//       };
//       const selected = selectLatestMapSearchResults.resultFunc(
//         getSearchMock, getMapResultsByLocationMock
//       );
//       expect(selected).toEqual();
//     });
//
//     it('should return undefined', () => {
//       const getMapResultsByLocationMock = {
//         '10,10': [
//           { id: 'resultMock' }
//         ]
//       };
//       const getSearchMock = {
//         location: [20, 20]
//       };
//       const selected = selectLatestMapSearchResults.resultFunc(
//         getSearchMock, getMapResultsByLocationMock
//       );
//       expect(selected).toEqual();
//     });
//   });
});

describe('deprecated', () => {
  const defaultState = {
    map: {
      baseLayer: 'topografie',
      overlays: [],
      viewCenter: [52.3719, 4.9012],
      zoom: 9,
      isLoading: false
    },
    search: null,
    page: {
      name: 'home'
    },
    detail: null,
    straatbeeld: null,
    dataSelection: null,
    ui: {
      isPrintMode: false
    }
  };

  describe('FETCH_SEARCH_RESULTS_BY_QUERY', () => {
    it('sets the search query and resets the search location and active category', () => {
      const inputState = {
        query: null,
        location: [12.345, 6.789],
        category: 'adres',
        numberOfResults: 23
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });
      expect(output.isLoading).toBe(true);
      expect(output.query).toBe('linnaeus');
      expect(output.location).toBeNull();
      expect(output.category).toBeNull();
      expect(output.numberOfResults).toBeNull();
    });

    it('sets query to null on empty string payload', () => {
      const inputState = {
        query: 'xyz',
        location: [12.345, 6.789],
        category: 'adres',
        numberOfResults: 23
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: ''
      });

      expect(output.query).toBe(null);
    });

    it('sets query isFullscreen to true', () => {
      const inputState = {
        ...defaultState,
        query: 'xyz',
        location: [12.345, 6.789],
        category: 'adres',
        numberOfResults: 23
      };
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: ''
      });

      expect(output.isFullscreen).toBe(true);
    });
  });

  describe('FETCH_SEARCH_RESULTS_BY_LOCATION', () => {
    it('resets the search query and active category and sets the search location', () => {
      const inputState = {
        query: 'some query',
        location: null,
        category: 'adres',
        numberOfResults: 23
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.isLoading).toBe(true);
      expect(output.query).toBeNull();
      expect(output.location).toEqual([52.001, 4.002]);
      expect(output.category).toBeNull();
      expect(output.numberOfResults).toBeNull();
    });

    it('sets query isFullscreen to false', () => {
      const inputState = {
        query: 'some query',
        location: null,
        category: 'adres',
        numberOfResults: 23
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.isFullscreen).toBe(false);
    });

    it('rounds the search location with a precision of 7 decimals', () => {
      const inputState = null;

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.123456789, 4.12345671]
      });

      expect(output.location)
        .toEqual([52.1234568, 4.1234567]);
    });
  });

  describe('FETCH_SEARCH_RESULTS_CATEGORY', () => {
    let inputState;
    let output;

    beforeEach(() => {
      inputState = {
        isLoading: false,
        query: 'Jan Beijerpad',
        location: null,
        category: null,
        numberOfResults: 23
      };

      output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_CATEGORY,
        payload: 'adres'
      });
    });

    it('sets the active category', () => {
      expect(output.category).toBe('adres');
    });

    it('sets the number of search results to null', () => {
      expect(output.numberOfResults).toBeNull();
    });

    it('sets isLoading to true', () => {
      expect(output.isLoading).toBe(true);
    });

    it('only updates the search state when a search is active', () => {
      output = reducer(null, { type: FETCH_SEARCH_RESULTS_CATEGORY, payload: 'adres' });
      expect(output).toBeNull();
    });
  });

  describe('SHOW_SEARCH_RESULTS', () => {
    let inputState;
    let output;
    beforeEach(() => {
      inputState = {
        isLoading: true,
        query: 'Jan Beijerpad',
        location: null,
        category: null,
        numberOfResults: null
      };

      output = reducer(inputState, { type: SHOW_SEARCH_RESULTS, payload: 23 });
    });

    it('sets the number of search results', () => {
      expect(output.numberOfResults).toBe(23);
    });

    it('sets isLoading to false', () => {
      expect(output.isLoading).toBe(false);
    });
  });
});
