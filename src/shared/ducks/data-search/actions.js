import {
  FETCH_GEO_SEARCH_RESULTS_FAILURE,
  FETCH_GEO_SEARCH_RESULTS_REQUEST,
  FETCH_GEO_SEARCH_RESULTS_SUCCESS_LIST,
  FETCH_GEO_SEARCH_RESULTS_SUCCESS_PANEL,
  REQUEST_NEAREST_DETAILS,
} from './constants'

// Action creators
export const fetchMapSearchResultsRequest = (payload, isMap) => ({
  type: FETCH_GEO_SEARCH_RESULTS_REQUEST,
  payload,
  meta: {
    isMap,
  },
})
export const fetchMapSearchResultsSuccessPanel = (results, numberOfResults) => ({
  type: FETCH_GEO_SEARCH_RESULTS_SUCCESS_PANEL,
  payload: { results, numberOfResults },
})

export const fetchMapSearchResultsSuccessList = (results, numberOfResults) => ({
  type: FETCH_GEO_SEARCH_RESULTS_SUCCESS_LIST,
  payload: { results, numberOfResults },
})

export const fetchMapSearchResultsFailure = payload => ({
  type: FETCH_GEO_SEARCH_RESULTS_FAILURE,
  payload,
})

export const requestNearestDetails = payload => ({
  type: REQUEST_NEAREST_DETAILS,
  payload,
})
