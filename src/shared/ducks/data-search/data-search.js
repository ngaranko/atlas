import { createSelector } from 'reselect';
import get from 'lodash.get';
import isObject from '../../services/is-object';
import BaseCoder from '../../services/base-coder/base-coder';
import { routing } from '../../../app/routes';

export const REDUCER_KEY = 'dataSearch';

export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';
export const FETCH_SEARCH_RESULTS_CATEGORY = 'FETCH_SEARCH_RESULTS_CATEGORY';
export const FETCH_SEARCH_RESULTS_BY_QUERY = 'FETCH_SEARCH_RESULTS_BY_QUERY';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_BY_LOCATION = 'FETCH_SEARCH_RESULTS_BY_LOCATION';

export const getSearch = (state) => state.search;
export const getMapResultsByLocation = (state) => get(state, 'search.mapSearchResultsByLocation', []);

export const isSearchActive = createSelector(getSearch, (geoSearch) => (
  geoSearch && geoSearch.location && geoSearch.location.length
));

const initialState = {
  mapSearchResultsByLocation: [],
  isLoading: false
};

export const SEARCH_VIEW = {
  MAP_SEARCH: 'MAP_SEARCH',
  SEARCH: 'SEARCH'
};

export default function MapSearchResultsReducer(state = initialState, action) {
  switch (action.type) {
    case routing.dataSearch.type: {
      return {
        ...state,
        query: get(action, 'meta.query.zoekterm')
      };
    }
    case routing.addresses.type: {
      const { query = {} } = action.meta;
      if (Object.prototype.hasOwnProperty.call(query, 'kaart')) {
        return {
          ...state,
          view: SEARCH_VIEW.MAP_SEARCH
        };
      }
      return {
        ...state,
        view: SEARCH_VIEW.SEARCH
      };
    }
    case FETCH_SEARCH_RESULTS_CATEGORY:
      return isObject(state) ? {
        ...state,
        isLoading: true,
        category: action.payload,
        numberOfResults: null
      } : state;

    case FETCH_SEARCH_RESULTS_BY_LOCATION:
      return {
        isLoading: true,
        isFullscreen: false,
        query: null,
        location: BaseCoder.toPrecision(action.payload, 7),
        category: null,
        numberOfResults: null
      };

    case FETCH_SEARCH_RESULTS_BY_QUERY:
      return {
        isLoading: true,
        isFullscreen: true,
        query: action.payload || null,
        location: null,
        category: null,
        numberOfResults: null
      };

    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        isLoading: false,
        numberOfResults: action.payload
      };
    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        mapSearchResultsByLocation: action.mapSearchResults
      };
    }

    case FETCH_MAP_SEARCH_RESULTS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export const isSearchLoading = (state) => state[REDUCER_KEY].isLoading;
export const getSearchView = (state) => state[REDUCER_KEY].view;
export const getSearchQuery = (state) => state[REDUCER_KEY].query;
export const getSearchCategory = (state) => state[REDUCER_KEY].category;
export const getNumberOfResults = (state) => state[REDUCER_KEY].numberOfResults;

export const getMapSearchResults = (location, user) => ({
  type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
  location,
  user
});
