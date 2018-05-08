import { createSelector } from 'reselect';

import { isSearchActive } from '../search-results/map-search-results';

const getCurrentEndPoint = (state) => state.mapDetail.currentEndpoint;
const getAllResults = (state) => state.mapDetail.byEndpoint;
const getDataSelection = (state) => state.dataSelection;

export const getGeometryFilter = createSelector(getDataSelection, (dataSelection) => (
  dataSelection && dataSelection.geometryFilter
));

export const getGeometryFilterMarkers = createSelector(getGeometryFilter, (geometryFilter) => (
  geometryFilter && geometryFilter.markers
));

export const getDrawShape = createSelector([getDataSelection, getGeometryFilterMarkers],
  (active, markers) => (
    active && markers ? { latLngList: [...markers] } : {}
  )
);

export const getGeoJson = createSelector([getCurrentEndPoint, getAllResults, isSearchActive],
  (currentEndpoint, allResults, active) => (
    (!allResults[currentEndpoint] || active) ? {} : {
      geometry: allResults[currentEndpoint].geometrie,
      name: allResults[currentEndpoint].code,
      label: allResults[currentEndpoint].label
    }
  )
);

export const selectLatestMapDetail = (state) =>
  state.mapDetail && state.mapDetail.currentEndpoint &&
  state.mapDetail.byEndpoint[state.mapDetail.currentEndpoint];

export const FETCH_MAP_DETAIL_REQUEST = 'FETCH_MAP_DETAIL_REQUEST';
export const FETCH_MAP_DETAIL_SUCCESS = 'FETCH_MAP_DETAIL_SUCCESS';
export const FETCH_MAP_DETAIL_FAILURE = 'FETCH_MAP_DETAIL_FAILURE';

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

export const getMapDetail = (endpoint, user) => ({
  type: FETCH_MAP_DETAIL_REQUEST,
  endpoint,
  user
});

window.reducers = window.reducers || {};
window.reducers.MapDetailReducer = MapDetailReducer;
