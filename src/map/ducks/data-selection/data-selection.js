import { createSelector } from 'reselect';

import { detailPointType } from '../../components/leaflet/services/icons.constant';

const generateMarkers = (markers) => (
  markers.map((markerLocation, index) => ({
    position: markerLocation,
    type: detailPointType,
    index
  })));

export const getDataSelection = (state) => state.dataSelection;

export const getClusterMarkers = createSelector([getDataSelection],
  (dataSelection) => (
    dataSelection && dataSelection.markers && dataSelection.markers.length ?
      generateMarkers(dataSelection.markers) : []
    )
  );

const getGeometryFilter = createSelector(getDataSelection, (dataSelection) => (
  dataSelection && dataSelection.geometryFilter
));

const getGeometryFilterMarkers = createSelector(getGeometryFilter, (geometryFilter) => (
  geometryFilter && geometryFilter.markers
));

export const getDrawShape = createSelector([getDataSelection, getGeometryFilterMarkers],
  (active, markers) => (
    active && markers ? { latLngList: [...markers] } : {}
  )
);
