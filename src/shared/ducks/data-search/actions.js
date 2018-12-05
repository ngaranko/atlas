import {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS_LIST,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS_PANEL,
  FETCH_QUERY_SEARCH_RESULTS_REQUEST,
  FETCH_QUERY_SEARCH_RESULTS_SUCCESS, SET_GEO_LOCATION,
  SET_QUERY_CATEGORY
} from './constants';

// Action creators
export const fetchMapSearchResultsRequest = (payload, isMap) => ({
  type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
  payload,
  meta: {
    isMap
  }
});
export const fetchMapSearchResultsSuccessPanel = (payload) => ({
  type: FETCH_MAP_SEARCH_RESULTS_SUCCESS_PANEL,
  payload
});

export const fetchMapSearchResultsSuccessList = (payload) => ({
  type: FETCH_MAP_SEARCH_RESULTS_SUCCESS_LIST,
  payload
});

export const fetchMapSearchResultsFailure = (payload) => ({
  type: FETCH_MAP_SEARCH_RESULTS_FAILURE,
  payload
});

export const showSearchResults = (results, query, numberOfResults) => ({
  type: FETCH_QUERY_SEARCH_RESULTS_SUCCESS,
  payload: { results, numberOfResults },
  meta: {
    tracking: {
      query,
      numberOfResults
    }
  }
});

export const fetchSearchResultsByQuery = (payload) => ({
  type: FETCH_QUERY_SEARCH_RESULTS_REQUEST,
  payload
});

export const setCategory = (payload) => ({
  type: SET_QUERY_CATEGORY,
  payload
});

export const setGeoLocation = (payload) => ({
  type: SET_GEO_LOCATION,
  payload
});
