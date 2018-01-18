import { createMapSearchResultsModel } from '../../../shared/services/map-search-results/map-search-results';

export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';

const initialState = {
  mapSearchResultsByLocation: {},
  isLoading: false,
  mapSearchResultsError: null
};

export default function MapSearchResultsReducer(state = initialState, action) {
  const locationId = Object
    .keys(action.location)
    .map((key) => action.location[key])
    .toString();

  switch (action.type) {
    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return { ...state, isLoading: true, mapSearchResultsError: null };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mapSearchResultsByLocation: {
          ...state.mapSearchResultsByLocation,
          [locationId]: action.mapSearchResults
        }
      };

    case FETCH_MAP_SEARCH_RESULTS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export const selectLatestMapSearchResults = (state) =>
  state.search && state.search.location &&
  state.mapSearchResultsByLocation[state.search.location];

export const getPreviewPanelResults = (state, resultsLimit) => {
  const results = selectLatestMapSearchResults(state) || [];
  return createMapSearchResultsModel(results, resultsLimit);
};

export const getMapSearchResults = (location, user) => ({
  type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
  location,
  user
});

window.reducers = window.reducers || {};
window.reducers.MapSearchResultsReducer = MapSearchResultsReducer;
