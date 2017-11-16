export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';

const initialState = {
  mapSearchResults: null,
  isLoading: false,
  error: null
};

export default function MapSearchResultsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS:
      return { ...state, isLoading: false, mapSearchResults: action.mapSearchResults };

    case FETCH_MAP_SEARCH_RESULTS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export const getMapSearchResults = (location, user) => ({
  type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
  location,
  user
});

window.reducers = window.reducers || {};
window.reducers.MapSearchResultsReducer = MapSearchResultsReducer;
