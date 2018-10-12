import reducer, {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS,
  getMapResultsByLocation,
  getMapSearchResults,
  getSearch,
  isSearchActive
} from './map-search-results';

import { getSearchMarker, selectLatestMapSearchResults } from '../map/map-selectors';
import ACTIONS, { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../../shared/actions';

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
    it('should return state.mapSearchResultsByLocation as a object', () => {
      const mockParameters = {
        mapSearchResultsByLocation: {}
      };
      const selected = getMapResultsByLocation(mockParameters);
      expect(selected).toBe(mockParameters.mapSearchResultsByLocation);
    });

    it('should return state.search.location as undefined', () => {
      const mockParameters = {};
      const selected = getMapResultsByLocation(mockParameters);
      expect(selected).toEqual({});
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

  describe('getSearchMarker', () => {
    it('should return an array of searchMarkers', () => {
      const getShortSelectedLocationMock = { latitude: 10, longitude: 10 };
      const selected = getSearchMarker.resultFunc(getShortSelectedLocationMock);
      expect(selected).toEqual([{ position: [10, 10], type: 'geoSearchType' }]);
    });

    it('should return an empty array', () => {
      const isSearchActiveMock = 0;
      const getSearchMock = {
        location: []
      };
      const selected = getSearchMarker.resultFunc(isSearchActiveMock, getSearchMock);
      expect(selected).toEqual([]);
    });
  });

  describe('selectLatestMapSearchResults', () => {
    it('should return an array of results', () => {
      const getMapResultsByLocationMock = {
        '123,456': [
          { id: 'resultMock1' }
        ],
        '789,1011': [
          { id: 'resultMock2' }
        ]
      };
      const getLocationIdMock = '123,456';
      const selected = selectLatestMapSearchResults.resultFunc(
        getLocationIdMock, getMapResultsByLocationMock
      );
      expect(selected).toBe(getMapResultsByLocationMock['123,456']);
    });

    it('should return undefined', () => {
      const getMapResultsByLocationMock = {};
      const getSearchMock = {
        location: [10, 10]
      };
      const selected = selectLatestMapSearchResults.resultFunc(
        getSearchMock, getMapResultsByLocationMock
      );
      expect(selected).toEqual();
    });

    it('should return undefined', () => {
      const getMapResultsByLocationMock = {
        '10,10': [
          { id: 'resultMock' }
        ]
      };
      const getSearchMock = {
        location: [20, 20]
      };
      const selected = selectLatestMapSearchResults.resultFunc(
        getSearchMock, getMapResultsByLocationMock
      );
      expect(selected).toEqual();
    });
  });
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
        ...defaultState,
        search: {
          query: null,
          location: [12.345, 6.789],
          category: 'adres',
          numberOfResults: 23
        }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });
      expect(output.search.isLoading)
        .toBe(true);
      expect(output.search.query)
        .toBe('linnaeus');
      expect(output.search.location)
        .toBeNull();
      expect(output.search.category)
        .toBeNull();
      expect(output.search.numberOfResults)
        .toBeNull();
    });

    it('sets query to null on empty string payload', () => {
      const inputState = {
        ...defaultState,
        search: {
          query: 'xyz',
          location: [12.345, 6.789],
          category: 'adres',
          numberOfResults: 23
        }
      };

      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: ''
      });

      expect(output.search.query)
        .toBe(null);
    });

    it('sets query isFullscreen to true', () => {
      const inputState = {
        ...defaultState,
        search: {
          query: 'xyz',
          location: [12.345, 6.789],
          category: 'adres',
          numberOfResults: 23
        }
      };
      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: ''
      });

      expect(output.search.isFullscreen)
        .toBe(true);
    });

    it('hides the layer selection, page, detail, straatbeeld and dataSelection', () => {
      const inputState = {
        ...defaultState,
        page: {
          ...defaultState.page,
          name: 'somePage',
          type: 'someType'
        },
        detail: { some: 'object' },
        straatbeeld: null,
        dataSelection: {
          ...defaultState.dataSelection,
          some: 'object'
        }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.page.name)
        .toBeNull();
      expect(output.page.type)
        .toBeNull();
      expect(output.detail)
        .toBeNull();
      expect(output.straatbeeld)
        .toBeNull();
      expect(output.dataSelection)
        .toBeNull();
    });

    it('clears the straatbeeld when no straatbeeld id exists', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { some: 'text' }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld)
        .toBeNull();
    });

    it('clears the straatbeeld when a straatbeeld is active', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { id: 'object' }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld)
        .toBeNull();
    });

    it('clears straatbeeld when a straatbeeld is active with a location', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { id: 'object', location: [1, 2], some: 'abc' }
      };
      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld)
        .toBeNull();
    });

    it('when map and map panel and page are not an object', () => {
      const inputState = {
        ...defaultState,
        map: null,
        ui: null,
        page: null
      };

      const output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: ''
      });
      expect(output.map)
        .toBeNull();
      expect(output.ui)
        .toBeNull();
      expect(output.page)
        .toBeNull();
    });
  });

  describe('FETCH_SEARCH_RESULTS_BY_LOCATION', () => {
    it('resets the search query and active category and sets the search location', () => {
      const inputState = {
        ...defaultState,
        search: {
          query: 'some query',
          location: null,
          category: 'adres',
          numberOfResults: 23
        }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.search.isLoading)
        .toBe(true);
      expect(output.search.query)
        .toBeNull();
      expect(output.search.location)
        .toEqual([52.001, 4.002]);
      expect(output.search.category)
        .toBeNull();
      expect(output.search.numberOfResults)
        .toBeNull();
    });

    it('sets query isFullscreen to false', () => {
      const inputState = {
        ...defaultState,
        search: {
          query: 'some query',
          location: null,
          category: 'adres',
          numberOfResults: 23
        }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.search.isFullscreen)
        .toBe(false);
    });

    it('rounds the search location with a precision of 7 decimals', () => {
      const inputState = {
        ...defaultState,
        search: null
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.123456789, 4.12345671]
      });

      expect(output.search.location)
        .toEqual([52.1234568, 4.1234567]);
    });

    it('hides the layer selection, active overlays, page, detail, straatbeeld and dataSelection', () => {
      const inputState = {
        ...defaultState,
        ui: {
          ...defaultState.ui,
          isMapPanelVisible: true
        },
        page: {
          ...defaultState.page,
          name: 'somePage'
        },
        search: {
          query: 'some query',
          location: null,
          category: 'adres',
          numberOfResults: 23
        },
        detail: {
          ...defaultState.detail,
          some: 'object'
        },
        straatbeeld: {
          ...defaultState.straatbeeld,
          some: 'object'
        },
        dataSelection: {
          ...defaultState.dataSelection,
          some: 'object'
        }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.page.name)
        .toBeNull();
      expect(output.detail)
        .toBeNull();
      expect(output.straatbeeld)
        .toBeNull();
      expect(output.dataSelection)
        .toBeNull();
    });

    it('does not change the viewCenter', () => {
      let output;
      const inputState = {
        ...defaultState,
        map: {
          ...defaultState.map,
          viewCenter: [52.123, 4.789]
        }
      };

      output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.map.viewCenter)
        .toEqual([52.123, 4.789]);

      output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.map.viewCenter)
        .toEqual([52.123, 4.789]);
    });

    it('clears the straatbeeld', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { some: 'text' }
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld)
        .toBeNull();
    });

    it('clears the straatbeeld when a straatbeeld is active', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { some: 'object' }
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld)
        .toBeNull();
    });

    it('clears the straatbeeld when a straatbeeld is active with a location', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { id: 'object', location: [1, 2], some: 'abc' }
      };

      // eslint-disable-next-line max-len
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld)
        .toBeNull();
    });

    it('removes a drawn line from the map', () => {
      const output = reducer(defaultState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.map.geometry)
        .toEqual([]);
    });

    it('does not depend on a map being present', () => {
      const inputState = {
        ...defaultState,
        map: null
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.map)
        .toBeNull();
    });

    it('when map panel and page are not an object', () => {
      const inputState = {
        ...defaultState,
        ui: null,
        page: null
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });
      expect(output.page)
        .toBeNull();
      expect(output.ui)
        .toBeNull();
    });
  });

  describe('FETCH_SEARCH_RESULTS_CATEGORY', () => {
    let inputState;
    let output;

    beforeEach(() => {
      inputState = {
        ...defaultState,
        search: {
          isLoading: false,
          query: 'Jan Beijerpad',
          location: null,
          category: null,
          numberOfResults: 23
        }
      };

      output = reducer(inputState, {
        type: ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY,
        payload: 'adres'
      });
    });

    it('sets the active category', () => {
      expect(output.search.category)
        .toBe('adres');
    });

    it('sets the number of search results to null', () => {
      expect(output.search.numberOfResults)
        .toBeNull();
    });

    it('sets isLoading to true', () => {
      expect(output.search.isLoading)
        .toBe(true);
    });

    it('only updates the search state when a search is active', () => {
      const { search, ...state } = defaultState; // remove search
      output = reducer(state, { type: ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY, payload: 'adres' });
      expect(output.search)
        .toBeUndefined();
    });
  });

  describe('SHOW_SEARCH_RESULTS', () => {
    let inputState;
    let output;
    beforeEach(() => {
      inputState = {
        ...defaultState,
        search: {
          isLoading: true,
          query: 'Jan Beijerpad',
          location: null,
          category: null,
          numberOfResults: null
        },
        map: {
          ...defaultState.map,
          isLoading: true
        }
      };

      output = reducer(inputState, { type: ACTIONS.SHOW_SEARCH_RESULTS, payload: 23 });
    });

    it('sets the number of search results', () => {
      expect(output.search.numberOfResults)
        .toBe(23);
    });

    it('sets isLoading to false', () => {
      expect(output.search.isLoading)
        .toBe(false);
    });

    it('sets map isLoading to false when map is available', () => {
      expect(output.map.isLoading)
        .toBe(false);
    });
  });
});
