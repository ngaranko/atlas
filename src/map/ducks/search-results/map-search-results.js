import { createSelector } from 'reselect';
import ACTIONS, { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../../shared/actions';
import isObject from '../../../shared/services/is-object';
import BaseCoder from '../../../shared/services/base-coder/base-coder';

export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';

export const getSearch = (state) => state.search;

// Todo: create a mapSearchResultsByLocation reducer or refactor
export const getMapResultsByLocation = (state) => state.mapSearchResultsByLocation || {};

export const isSearchActive = createSelector(getSearch, (geoSearch) => (
  geoSearch && geoSearch.location && geoSearch.location.length
));

const initialState = {
  mapSearchResultsByLocation: {},
  isLoading: false
};

export default function MapSearchResultsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY:
      return {
        ...state,
        search: isObject(state.search) ? {
          ...state.search,
          isLoading: true,
          category: action.payload,
          numberOfResults: null
        } : state.search
      };

    case FETCH_SEARCH_RESULTS_BY_LOCATION:
      return {
        ...state,
        search: {
          isLoading: true,
          isFullscreen: false,
          query: null,
          location: BaseCoder.toPrecision(action.payload, 7),
          category: null,
          numberOfResults: null
        },
        map: isObject(state.map) ? {
          ...state.map,
          geometry: []
        } : state.map,
        page: isObject(state.page) ? {
          ...state.page,
          name: null
        } : state.page,
        detail: null,
        straatbeeld: null,
        dataSelection: null
      };

    case ACTIONS.FETCH_SEARCH_RESULTS_BY_QUERY:
      return {
        ...state,
        search: {
          isLoading: true,
          isFullscreen: true,
          query: action.payload || null,
          location: null,
          category: null,
          numberOfResults: null
        },
        page: isObject(state.page) ? {
          ...state.page,
          name: null,
          type: null
        } : state.page,
        detail: null,
        straatbeeld: null,
        dataSelection: null
      };

    case ACTIONS.SHOW_SEARCH_RESULTS:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: false,
          numberOfResults: action.payload
        },
        map: {
          ...state.map,
          isLoading: false
        }
      };
    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        search: {
          ...state.search,
          isLoading: true
        }
      };

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
