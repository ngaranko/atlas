export const FETCH_MAP_DETAIL_REQUEST = 'FETCH_MAP_DETAIL_REQUEST';
const FETCH_MAP_DETAIL_SUCCESS = 'FETCH_MAP_DETAIL_SUCCESS';
const FETCH_MAP_DETAIL_FAILURE = 'FETCH_MAP_DETAIL_FAILURE';

const initialState = {
  mapDetail: {
    byEndpoint: {},
    isLoading: false
  }
};

export default function MapDetailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_DETAIL_REQUEST:
      return {
        ...state,
        mapDetail: {
          ...state.mapDetail,
          currentEndpoint: action.endpoint,
          isLoading: true
        }
      };

    case FETCH_MAP_DETAIL_SUCCESS:
      return {
        ...state,
        mapDetail: {
          ...state.mapDetail,
          isLoading: false,
          byEndpoint: {
            ...state.mapDetail.byEndpoint,
            [action.endpoint]: action.mapDetail
          }
        }
      };

    case FETCH_MAP_DETAIL_FAILURE:
      return {
        ...state,
        mapDetail: {
          ...state.mapDetail,
          isLoading: false
        }
      };

    default:
      return state;
  }
}

export const selectLatestMapDetail = (state) =>
  state.mapDetail && state.mapDetail.currentEndpoint &&
  state.mapDetail.byEndpoint[state.mapDetail.currentEndpoint];

export const getMapDetail = (endpoint, user) => ({
  type: FETCH_MAP_DETAIL_REQUEST,
  endpoint,
  user
});
export const fetchMapDetailFailure = (error) => ({ type: FETCH_MAP_DETAIL_FAILURE, error });
export const fetchMapDetailSuccess = (endpoint, mapDetail) => ({
  type: FETCH_MAP_DETAIL_SUCCESS,
  endpoint,
  mapDetail
});

window.reducers = window.reducers || {};
window.reducers.MapDetailReducer = MapDetailReducer;
