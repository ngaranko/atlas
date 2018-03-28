export const SET_DATA_SELECTION_CATALOG_FILTERS = 'SET_DATA_SELECTION_CATALOG_FILTERS';

const initialState = {};

export default function DataSelectionCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_SELECTION_CATALOG_FILTERS:
      return {
        ...action.payload
      };

    default:
      return state;
  }
}

export const setDataSelectionDcatFilters = (payload) =>
  ({
    type: SET_DATA_SELECTION_CATALOG_FILTERS,
    payload
  });

window.reducers = window.reducers || {};
window.reducers.DataSelectionCatalogReducer = DataSelectionCatalogReducer;
