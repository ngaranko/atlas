import { createSelector } from 'reselect';
import get from 'lodash.get';
import isObject from '../../services/is-object';
import BaseCoder from '../../services/base-coder/base-coder';
import { routing } from '../../../app/routes';
import parseLocationString from '../../../map/ducks/map/location-parse';

export const REDUCER_KEY = 'dataSearch';

export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';
export const FETCH_SEARCH_RESULTS_CATEGORY = 'FETCH_SEARCH_RESULTS_CATEGORY';
export const FETCH_SEARCH_RESULTS_BY_QUERY = 'FETCH_SEARCH_RESULTS_BY_QUERY';
export const SHOW_SEARCH_RESULTS = 'SHOW_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_BY_LOCATION = 'FETCH_SEARCH_RESULTS_BY_LOCATION';

const initialState = {
  mapSearchResultsByLocation: [], // TODO: refactor, rename
  isLoading: false
};

export const SEARCH_VIEW = {
  MAP_SEARCH: 'MAP_SEARCH',
  SEARCH: 'SEARCH'
};

export default function MapSearchResultsReducer(state = initialState, action) {
  const locationString = get(action, 'meta.query.locatie');
  let location;
  if (locationString) {
    const latLngObj = parseLocationString(locationString);
    location = {
      latitude: latLngObj.lat,
      longitude: latLngObj.lng
    };
  }

  switch (action.type) {
    case routing.dataSearch.type: {
      return {
        ...state,
        query: get(action, 'meta.query.zoekterm'),
        geoSearch: location
      };
    }
    case routing.map.type: {
      if (location) {
        return {
          ...state,
          geoSearch: location
        };
      }
      return state;
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
        query: null,
        location: action.payload,
        category: null,
        numberOfResults: null
      };

    case FETCH_SEARCH_RESULTS_BY_QUERY:
      return {
        isLoading: true,
        query: action.payload,
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
        isLoading: true,
        geoSearch: action.payload
      };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        mapSearchResultsByLocation: action.payload
      };
    }

    case FETCH_MAP_SEARCH_RESULTS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

// Selectors
/**
 * @deprecated Don't use getDataSearch outside reducer,
 * use specific selector. e.g.: getNumberOfResults()
 */
export const getDataSearch = (state) => state[REDUCER_KEY];
export const isSearchActive = createSelector(getDataSearch, (geoSearch) => (
  geoSearch && geoSearch.location && geoSearch.location.length
));
export const getDataSearchLocation = (state) => state[REDUCER_KEY].geoSearch;
export const getMapResultsByLocation = (state) => get(state, [REDUCER_KEY, 'mapSearchResultsByLocation'], []); // TODO: rename, no location required
export const isSearchLoading = (state) => state[REDUCER_KEY].isLoading;
export const getSearchQuery = (state) => state[REDUCER_KEY].query;
export const getSearchCategory = (state) => state[REDUCER_KEY].category;
export const getNumberOfResults = (state) => state[REDUCER_KEY].numberOfResults;

// Action creators
export const fetchMapSearchResultsRequest = (location) => ({
  type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
  payload: location
});
export const fetchMapSearchResultsSuccess = (results) => ({
  type: FETCH_MAP_SEARCH_RESULTS_SUCCESS,
  payload: results
});
export const fetchMapSearchResultsFailure = (error) => ({
  type: FETCH_MAP_SEARCH_RESULTS_FAILURE,
  payload: error
});
// export const getMapSearchResults = (location, user) => ({
//   type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
//   location,
//   user
// }); // TODO: user or remove

export const fetchSearchResultsByQuery = (query) => ({
  type: FETCH_SEARCH_RESULTS_BY_QUERY,
  payload: query
});
