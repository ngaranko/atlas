export const FETCH_MAP_DETAIL_REQUEST = 'FETCH_MAP_DETAIL_REQUEST';
export const FETCH_MAP_DETAIL_SUCCESS = 'FETCH_MAP_DETAIL_SUCCESS';
export const FETCH_MAP_DETAIL_FAILURE = 'FETCH_MAP_DETAIL_FAILURE';

const initialState = {
  mapDetailsByEndpoint: {},
  isLoading: false,
  error: null
};

export default function MapDetailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_DETAIL_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mapDetailsByEndpoint: {
          ...state.mapDetailsByEndpoint,
          [action.endpoint]: action.mapDetail
        }
      };

    case FETCH_MAP_DETAIL_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export const selectLatestMapDetail = (state) =>
  state.detail && state.detail.endpoint &&
  state.mapDetailsByEndpoint[state.detail.endpoint];

export const getMapDetail = (endpoint, user) => ({
  type: FETCH_MAP_DETAIL_REQUEST,
  endpoint,
  user
});

window.reducers = window.reducers || {};
window.reducers.MapDetailReducer = MapDetailReducer;
