export const FETCH_MAP_GEO_SEARCH_REQUEST = 'FETCH_MAP_GEO_SEARCH_REQUEST';
export const FETCH_MAP_GEO_SEARCH_SUCCESS = 'FETCH_MAP_GEO_SEARCH_SUCCESS';
export const FETCH_MAP_GEO_SEARCH_FAILURE = 'FETCH_MAP_GEO_SEARCH_FAILURE';

const initialState = {
  mapResults: null,
  isLoading: false,
  error: null
};

export default function MapGeoSearchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_GEO_SEARCH_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_GEO_SEARCH_SUCCESS:
      return { ...state, isLoading: false, mapResults: action.mapResults };

    case FETCH_MAP_GEO_SEARCH_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export const getMapGeoSearch = (location) => ({
  type: FETCH_MAP_GEO_SEARCH_REQUEST,
  location
});

window.reducers = window.reducers || {};
window.reducers.MapGeoSearchReducer = MapGeoSearchReducer;
