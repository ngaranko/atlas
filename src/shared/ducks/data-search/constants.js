export const REDUCER_KEY = 'dataSearch'
export const FETCH_GEO_SEARCH_RESULTS_REQUEST = `${REDUCER_KEY}/FETCH_GEO_SEARCH_RESULTS_REQUEST`
export const FETCH_GEO_SEARCH_RESULTS_FAILURE = `${REDUCER_KEY}/FETCH_GEO_SEARCH_RESULTS_FAILURE`
export const FETCH_GEO_SEARCH_RESULTS_SUCCESS_PANEL = `${REDUCER_KEY}/FETCH_GEO_SEARCH_RESULTS_SUCCESS_PANEL`
export const FETCH_GEO_SEARCH_RESULTS_SUCCESS_LIST = `${REDUCER_KEY}/FETCH_GEO_SEARCH_RESULTS_SUCCESS_LIST`

export const REQUEST_NEAREST_DETAILS = `${REDUCER_KEY}/REQUEST_NEAREST_DETAILS`

export const initialState = {
  query: '',
  resultsMapPanel: [],
  resultsMap: [],
  resultsQuery: [],
  isLoading: false,
  numberOfResults: 0,
  category: null,
  error: null,
}
