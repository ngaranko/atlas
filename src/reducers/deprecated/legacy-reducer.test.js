import * as STRAATBEELD_CONFIG from '../../../modules/straatbeeld/straatbeeld-config';
import reducer from './legacy-reducer';
import ACTIONS from '../../shared/actions';
import {
  FETCH_SEARCH_RESULTS_BY_LOCATION,
  FETCH_SEARCH_RESULTS_BY_QUERY,
  getMapSearchResults,
  SHOW_SEARCH_RESULTS
} from '../../shared/ducks/search/search';

const deepCopy = (oldObject) => JSON.parse(JSON.stringify(oldObject));

describe('Former straatbeeld reducer', () => {
  let defaultState;

  beforeAll(() => {
    STRAATBEELD_CONFIG.default = {
      DEFAULT_FOV: 79
    };
  });

  beforeEach(() => {
    // eslint-disable-next-line max-len
    // TODO: Note: before each required because somewhere in the reducer the map.viewCenter is mutated (not pure function).
    // Not fixing it with this refactor step.
    defaultState = {
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
  });

  describe('FETCH_STRAATBEELD_BY_ID', () => {
    let payload;

    beforeEach(() => {
      payload = {
        id: 'ABC',
        heading: 123,
        isInitial: true
      };
    });

    it('resets search results', () => {
      const inputState = {
        ...defaultState,
        search: {
          query: 'linnaeus'
        }
      };

      const output = reducer(inputState, { type: ACTIONS.FETCH_STRAATBEELD_BY_ID, payload });
      expect(output.search).toBeNull();
    });
  });
});

describe('Former dataSelection Reducer', () => {
  const DEFAULT_STATE = {
    map: {
      baseLayer: 'topografie',
      overlays: [],
      viewCenter: [52.3719, 4.9012],
      zoom: 9,
      isLoading: false
    },
    filters: {},
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

  describe('FETCH_DATA_SELECTION', () => {
    let payload;

    beforeEach(() => {
      payload = {
        dataset: 'bag',
        page: 1
      };
    });

    it('has a default table view and set map not to be loading', () => {
      const mockedState = deepCopy(DEFAULT_STATE);

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.map.isLoading).toEqual(false);
    });

    it('can display in list view and set map to be loading', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      payload.view = 'LIST';

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.map.isLoading).toEqual(true);
    });

    it('can display in list view from state', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      mockedState.dataSelection = {
        view: 'LIST'
      };

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.map.isLoading).toEqual(true);
    });

    it('sets the dataSelection dataset, filters and page', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      mockedState.filters = {
        buurtcombinatie: 'Geuzenbuurt',
        buurt: 'Trompbuurt'
      };
      payload.filters = {
        filter: 'filterValue'
      };

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.filters).toEqual({
        filter: 'filterValue'
      });
    });

    it('sets the dataSelection dataset and page', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      mockedState.filters = {
        buurtcombinatie: 'Geuzenbuurt',
        buurt: 'Trompbuurt'
      };

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.filters).toEqual({
        buurtcombinatie: 'Geuzenbuurt',
        buurt: 'Trompbuurt'
      });
    });

    it('sets the dataSelection query, page, view, dataset and empties filters', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      mockedState.filters = {
        buurtcombinatie: 'Geuzenbuurt',
        buurt: 'Trompbuurt'
      };

      payload.emptyFilters = true;

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.filters).toEqual({});
    });

    it('disables search, page, detail and straatbeeld', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      mockedState.search = { some: 'object' };
      mockedState.page.name = 'somePage';
      mockedState.detail = { some: 'object' };
      mockedState.straatbeeld = { some: 'object' };

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });

      expect(output.search).toBeNull();
      expect(output.page.name).toBeNull();
      expect(output.detail).toBeNull();
      expect(output.straatbeeld).toBeNull();
    });

    it('preserves the isPrintMode variable', () => {
      let output;
      const mockedState = deepCopy(DEFAULT_STATE);

      // With print mode enabled
      mockedState.ui.isPrintMode = true;
      output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });
      expect(output.ui.isPrintMode).toBe(true);

      // With print mode disabled
      mockedState.ui.isPrintMode = false;
      output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload });
      expect(output.ui.isPrintMode).toBe(false);
    });

    it('when payload is empty and map and ui and page are not an object', () => {
      const mockedState = deepCopy(DEFAULT_STATE);
      mockedState.map = null;
      mockedState.ui = null;
      mockedState.page = null;

      const output = reducer(mockedState, { type: ACTIONS.FETCH_DATA_SELECTION, payload: '' });
      expect(output.map).toBeNull();
      expect(output.ui).toBeNull();
      expect(output.page).toBeNull();
    });
  });

  describe('SHOW_DATA_SELECTION', () => {
    let mockedState;
    let payload;
    let output;

    beforeEach(() => {
      mockedState = {
        dataSelection: {
          dataset: 'bag',
          page: 1,
          isLoading: true
        },
        filters: {
          buurtcombinatie: 'Geuzenbuurt',
          buurt: 'Trompbuurt'
        },
        map: {
          isLoading: true
        }
      };

      payload = ['MOCKED', 'MARKER', 'ARRAY'];
    });

    it('sets map isLoading to false', () => {
      output = reducer(mockedState, { type: ACTIONS.SHOW_DATA_SELECTION, payload });

      expect(output.map.isLoading).toEqual(false);
    });

    it('when map is not an object', () => {
      mockedState.map = null;

      output = reducer(mockedState, { type: ACTIONS.SHOW_DATA_SELECTION, payload });
      expect(output.map).toBeNull();
    });
  });

  describe('RESET_DATA_SELECTION', () => {
    let mockedState;
    let payload;
    let output;

    beforeEach(() => {
      mockedState = {
        dataSelection: {
          dataset: 'bag',
          page: 1,
          isLoading: true
        },
        filters: {
          buurtcombinatie: 'Geuzenbuurt',
          buurt: 'Trompbuurt'
        },
        map: {
          isLoading: true
        }
      };

      payload = ['MOCKED', 'MARKER', 'ARRAY'];
    });

    it('sets map isLoading to false', () => {
      output = reducer(mockedState, { type: ACTIONS.RESET_DATA_SELECTION, payload });

      expect(output.map.isLoading).toEqual(false);
    });

    it('when map is not an object', () => {
      mockedState.map = null;

      output = reducer(mockedState, { type: ACTIONS.RESET_DATA_SELECTION, payload });
      expect(output.map).toBeNull();
    });
  });

  describe('SET_DATA_SELECTION_VIEW', () => {
    let mockedState;

    beforeEach(() => {
      mockedState = {
        dataSelection: {
          dataset: 'bag',
          page: 1,
          isLoading: true
        },
        filters: {
          buurtcombinatie: 'Geuzenbuurt',
          buurt: 'Trompbuurt'
        },
        map: {}
      };
    });

    it('can set the view to list view and set map to be loading', () => {
      const output = reducer(mockedState, {
        type: ACTIONS.SET_DATA_SELECTION_VIEW,
        payload: 'LIST'
      });

      expect(output.map.isLoading).toBe(true);
    });

    it('can set the view to table view and set map not to be loading', () => {
      const output = reducer(mockedState, {
        type: ACTIONS.SET_DATA_SELECTION_VIEW,
        payload: 'TABLE'
      });

      expect(output.map.isLoading).toBe(false);
    });

    it('when dataSelection and map are not an object', () => {
      mockedState.dataSelection = null;
      mockedState.map = null;

      const output = reducer(mockedState, {
        type: ACTIONS.SET_DATA_SELECTION_VIEW,
        payload: 'LIST'
      });
      expect(output.map).toBeNull();
    });
  });
});

describe('Former mapSearch reducer', () => {
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

  describe('FETCH_SEARCH_RESULTS_BY_QUERY', () => {
    it('hides the layer selection, page, detail, straatbeeld and dataSelection', () => {
      const inputState = {
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

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.page.name).toBeNull();
      expect(output.page.type).toBeNull();
      expect(output.detail).toBeNull();
      expect(output.straatbeeld).toBeNull();
      expect(output.dataSelection).toBeNull();
    });

    it('clears the straatbeeld when no straatbeeld id exists', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { some: 'text' }
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld).toBeNull();
    });

    it('clears the straatbeeld when a straatbeeld is active', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { id: 'object' }
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld).toBeNull();
    });

    it('clears straatbeeld when a straatbeeld is active with a location', () => {
      const inputState = {
        ...defaultState,
        straatbeeld: { id: 'object', location: [1, 2], some: 'abc' }
      };
      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: 'linnaeus'
      });

      expect(output.straatbeeld).toBeNull();
    });

    it('when map and map panel and page are not an object', () => {
      const inputState = {
        ...defaultState,
        map: null,
        ui: null,
        page: null
      };

      const output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_QUERY,
        payload: ''
      });
      expect(output.map).toBeNull();
      expect(output.ui).toBeNull();
      expect(output.page).toBeNull();
    });
  });

  describe('FETCH_SEARCH_RESULTS_BY_LOCATION', () => {
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

      expect(output.page.name).toBeNull();
      expect(output.detail).toBeNull();
      expect(output.straatbeeld).toBeNull();
      expect(output.dataSelection).toBeNull();
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

      expect(output.map.viewCenter).toEqual([52.123, 4.789]);

      output = reducer(inputState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.map.viewCenter).toEqual([52.123, 4.789]);
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

      expect(output.straatbeeld).toBeNull();
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

      expect(output.straatbeeld).toBeNull();
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

      expect(output.straatbeeld).toBeNull();
    });

    it('removes a drawn line from the map', () => {
      const output = reducer(defaultState, {
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [52.001, 4.002]
      });

      expect(output.map.geometry).toEqual([]);
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

      expect(output.map).toBeNull();
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
      expect(output.page).toBeNull();
      expect(output.ui).toBeNull();
    });
  });

  describe('SHOW_SEARCH_RESULTS', () => {
    let inputState;
    let output;
    beforeEach(() => {
      inputState = {
        ...defaultState,
        map: {
          ...defaultState.map,
          isLoading: true
        }
      };

      output = reducer(inputState, { type: SHOW_SEARCH_RESULTS, payload: 23 });
    });

    it('sets map isLoading to false when map is available', () => {
      expect(output.map.isLoading).toBe(false);
    });
  });
});
