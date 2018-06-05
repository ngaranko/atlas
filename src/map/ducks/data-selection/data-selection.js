import { createSelector } from 'reselect';

import { detailPointType } from '../../components/leaflet/services/icons.constant';
import DRAWTOOL_CONFIG from '../../services/draw-tool/draw-tool-config';

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
const getMap = (state) => state.map;
const isDrawingActive = createSelector(getMap, (mapState) => (
  mapState.drawingMode !== DRAWTOOL_CONFIG.DRAWING_MODE.NONE
));

export const getDrawShape = createSelector(
  [getDataSelection, isDrawingActive, getGeometryFilterMarkers],
  (active, drawingActive, markers) => (
    active && !drawingActive && markers ? { latLngList: [...markers] } : {}
  )
);
