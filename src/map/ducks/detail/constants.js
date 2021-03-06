export const REDUCER_KEY = 'mapDetail'

export const FETCH_MAP_DETAIL_REQUEST = `${REDUCER_KEY}/FETCH_MAP_DETAIL_REQUEST`
export const FETCH_MAP_DETAIL_SUCCESS = `${REDUCER_KEY}/FETCH_MAP_DETAIL_SUCCESS`
export const FETCH_MAP_DETAIL_FAILURE = `${REDUCER_KEY}/FETCH_MAP_DETAIL_FAILURE`

export const initialState = {
  byEndpoint: {},
  isLoading: false,
  currentEndpoint: '',
  error: '',
}
