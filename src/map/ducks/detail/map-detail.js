import { createSelector } from 'reselect';

import { isSearchActive } from '../search-results/map-search-results';

const getDataSelection = (state) => state.dataSelection;
const getDetail = (state) => state.detail;

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

export const getGeometry = createSelector(getDetail, (detail) => detail && detail.geometry);

export const shouldShowGeoJson = createSelector([isSearchActive, getDetail, getDataSelection],
 (searchActive, detailActive, dataSelectionActive) => (
   detailActive && !dataSelectionActive && !searchActive
 )
);

export const getGeoJson = createSelector(
  [shouldShowGeoJson, getGeometry, getDetail],
  (isGeoJsonActive, geometry, detail) => (
    (isGeoJsonActive && geometry) ? {
      geometry,
      label: detail.display
    } : {}
  )
);

export const selectLatestMapDetail = (state) =>
  state.mapDetail && state.mapDetail.currentEndpoint &&
  state.mapDetail.byEndpoint[state.mapDetail.currentEndpoint];

export const FETCH_MAP_DETAIL_REQUEST = 'FETCH_MAP_DETAIL_REQUEST';
const FETCH_MAP_DETAIL_SUCCESS = 'FETCH_MAP_DETAIL_SUCCESS';
const FETCH_MAP_DETAIL_FAILURE = 'FETCH_MAP_DETAIL_FAILURE';

const initialState = {
  byEndpoint: {},
  isLoading: false
};

export default function MapDetailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_DETAIL_REQUEST:
      return {
        ...state,
        currentEndpoint: action.endpoint,
        isLoading: true
      };

    case FETCH_MAP_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        byEndpoint: {
          ...state.byEndpoint,
          [action.endpoint]: action.mapDetail
        }
      };

    case FETCH_MAP_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false
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
export const fetchMapDetailFailure = (error) => ({ type: FETCH_MAP_DETAIL_FAILURE, error });
export const fetchMapDetailSuccess = (endpoint, mapDetail) => ({
  type: FETCH_MAP_DETAIL_SUCCESS,
  endpoint,
  mapDetail
});

window.reducers = window.reducers || {};
window.reducers.MapDetailReducer = MapDetailReducer;
