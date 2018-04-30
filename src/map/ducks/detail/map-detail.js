import { createSelector } from 'reselect';

export const FETCH_MAP_DETAIL_REQUEST = 'FETCH_MAP_DETAIL_REQUEST';
export const FETCH_MAP_DETAIL_SUCCESS = 'FETCH_MAP_DETAIL_SUCCESS';
export const FETCH_MAP_DETAIL_FAILURE = 'FETCH_MAP_DETAIL_FAILURE';

const initialState = {
  mapDetail: {
    byEndpoint: {},
    isLoading: false
  }
};

const getCurrentEndPoint = (state) => state.mapDetail.currentEndpoint;
const getAllResults = (state) => state.mapDetail.byEndpoint;
const isActive = (state) => state.search && state.search.location.length;

export const getGeometry = createSelector([getCurrentEndPoint, getAllResults, isActive],
  (currentEndpoint, allResults, active) => {
    if (!allResults[currentEndpoint] || active) {
      return [];
    }
    return [
      {
        geometry: allResults[currentEndpoint].geometrie,
        category: 'detail',
        id: `id-${Math.random().toString(36).substr(2, 16)}`,
        name: allResults[currentEndpoint].code,
        useAutoFocus: true
      }
    ];
  }
);

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

window.reducers = window.reducers || {};
window.reducers.MapDetailReducer = MapDetailReducer;
