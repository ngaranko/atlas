export const FETCH_CATALOG_FILTERS_REQUEST = 'FETCH_CATALOG_FILTERS_REQUEST';
export const FETCH_CATALOG_FILTERS_SUCCESS = 'FETCH_CATALOG_FILTERS_SUCCESS';
export const FETCH_CATALOG_FILTERS_FAILURE = 'FETCH_CATALOG_FILTERS_FAILURE';

const initialState = {};

export default function DataSelectionCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_FILTERS_SUCCESS:
      return {
        ...action.payload
      };

    case FETCH_CATALOG_FILTERS_FAILURE:
      return {
        ...action.payload
      };

    default:
      return state;
  }
}

export const fetchCatalogFilters = (payload) => ({
  type: FETCH_CATALOG_FILTERS_REQUEST,
  payload
});

window.reducers = window.reducers || {};
window.reducers.DataSelectionCatalogReducer = DataSelectionCatalogReducer;
