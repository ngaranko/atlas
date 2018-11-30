import {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_BY_QUERY,
  SHOW_SEARCH_RESULTS
} from './constants';

// TODO: rename, no location required

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

export const showSearchResults = ({ query, numberOfResults }) => ({
  type: SHOW_SEARCH_RESULTS,
  payload: numberOfResults,
  meta: {
    tracking: {
      query,
      numberOfResults
    }
  }
});

export const fetchSearchResultsByQuery = (query) => ({
  type: FETCH_SEARCH_RESULTS_BY_QUERY,
  payload: query
});
