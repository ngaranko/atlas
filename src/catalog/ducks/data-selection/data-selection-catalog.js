export const FETCH_CATALOG_FILTERS_REQUEST = 'FETCH_CATALOG_FILTERS_REQUEST';
export const FETCH_CATALOG_FILTERS_SUCCESS = 'FETCH_CATALOG_FILTERS_SUCCESS';
export const FETCH_CATALOG_FILTERS_FAILURE = 'FETCH_CATALOG_FILTERS_FAILURE';

const initialState = {
  isLoading: false,
  error: null
};

export default function DataSelectionCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_FILTERS_REQUEST:
      return {
        isLoading: true,
        error: null
      };

    case FETCH_CATALOG_FILTERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null
      };

    case FETCH_CATALOG_FILTERS_FAILURE:
      return {
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

export const fetchCatalogFilters = () => ({
  type: FETCH_CATALOG_FILTERS_REQUEST
});
