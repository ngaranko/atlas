import reducer, {
  FETCH_CATALOG_FILTERS_FAILURE,
  FETCH_CATALOG_FILTERS_REQUEST,
  FETCH_CATALOG_FILTERS_SUCCESS,
  fetchCatalogFilters
} from './data-selection-catalog';

const initialState = {
  isLoading: false,
  error: null
};
describe('data-selection-catalog reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_CATALOG_FILTERS_REQUEST', () => {
    const startAction = {
      type: FETCH_CATALOG_FILTERS_REQUEST
    };
    expect(reducer({}, startAction)).toEqual({
      isLoading: true,
      error: null
    });
  });

  it('should handle FETCH_CATALOG_FILTERS_SUCCESS', () => {
    const successAction = {
      type: FETCH_CATALOG_FILTERS_SUCCESS,
      payload: { items: [{ id: 1 }] }
    };
    expect(reducer({}, successAction)).toEqual({
      isLoading: false,
      error: null,
      items: [{ id: 1 }]
    });
  });

  it('should handle FETCH_CATALOG_FILTERS_FAILURE', () => {
    const updateAction = {
      type: FETCH_CATALOG_FILTERS_FAILURE,
      payload: 'Error'
    };
    expect(reducer({}, updateAction)).toEqual({
      error: 'Error',
      isLoading: false
    });
  });
});

// ACTION CREATORS
describe('data-selection-catalog actions', () => {
  describe('fetchMapBaseLayers', () => {
    it('should create an action to request map baseLayers', () => {
      const expectedAction = {
        type: FETCH_CATALOG_FILTERS_REQUEST
      };
      expect(fetchCatalogFilters()).toEqual(expectedAction);
    });
  });
});
