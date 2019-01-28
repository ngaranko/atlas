import { createSelector } from 'reselect';
import { geoSearchType } from '../../components/leaflet/services/icons.constant';

export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';

export const getSearch = (state) => state.search;
export const getMapResultsByLocation = (state) => state.mapSearchResultsByLocation;

export const isSearchActive = createSelector(getSearch, (geoSearch) => (
  geoSearch && geoSearch.location && geoSearch.location.length
));

export const getSearchMarker = createSelector([isSearchActive, getSearch], (active, geoSearch) => (
  active ? [{ position: geoSearch.location, type: geoSearchType }] : []
));

export const selectLatestMapSearchResults = createSelector([getSearch, getMapResultsByLocation],
  (geoSearch, mapResultsByLocation) => (
    geoSearch && geoSearch.location && mapResultsByLocation[geoSearch.location]
  ));

const initialState = {
  mapSearchResultsByLocation: {},
  isLoading: false,
  mapSearchResultsError: null
};

export default function MapSearchResultsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return { ...state, isLoading: true, mapSearchResultsError: null };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS: {
      const locationId = Object.values(action.location).toString();
      return {
        ...state,
        isLoading: false,
        mapSearchResultsByLocation: {
          ...state.mapSearchResultsByLocation,
          [locationId]: action.mapSearchResults
        },
        search: {
          ...state.search,
          isLoading: false
        }
      };
    }

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
