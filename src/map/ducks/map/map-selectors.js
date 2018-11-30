import { createSelector } from 'reselect';

import {
  getPanoramaLocation,
  getPanoramaMarkers
} from '../../../shared/ducks/panorama/panorama';
import { getGeoJson as getDetailGeoJson } from '../detail/map-detail';
import { geoSearchType } from '../../components/leaflet/services/icons.constant';
import { getMapResultsByLocation } from '../../../shared/ducks/data-search/selectors';
import { getDetail } from '../../../shared/ducks/detail/detail';
import drawToolConfig from '../../services/draw-tool/draw-tool.config';
import { getSelectionLocation } from '../../../shared/ducks/selection/selection';

export const getMap = (state) => state.map;
export const getActiveBaseLayer = createSelector(getMap, (mapState) => mapState.baseLayer);
export const getMapZoom = createSelector(getMap, (mapState) => mapState.zoom);

export const getMapOverlays = createSelector(getMap, (mapState) => mapState && mapState.overlays);

export const getMapCenter = createSelector(getMap, (mapState) => mapState && mapState.viewCenter);
export const getMapBoundingBox = createSelector(getMap, (mapState) => mapState.boundingBox);

export const getDrawingMode = createSelector(getMap, (mapState) => mapState.drawingMode);
export const isDrawingEnabled = createSelector(
  getMap,
  (mapState) => mapState.drawingMode !== drawToolConfig.DRAWING_MODE.NONE
);
export const getGeometry = createSelector(getMap, (mapState) => mapState.geometry);
export const getShapeMarkers = createSelector(getMap, (mapState) => mapState.shapeMarkers);
export const getShapeDistanceTxt = createSelector(getMap, (mapState) => mapState.shapeDistanceTxt);

export const getCenter = createSelector([getMapCenter, getPanoramaLocation],
  (mapCenter, panoramaLocation) => (
    panoramaLocation || mapCenter
  ));

export const getLatitude = createSelector(getCenter, (center) => center[0]);
export const getLongitude = createSelector(getCenter, (center) => center[1]);

export const getRdGeoJsons = createSelector(getDetailGeoJson, (geoJson) => [geoJson]);

export const getShortSelectedLocation = (state) => state.selection && state.selection.location;

export const getLocationId = createSelector(
  getShortSelectedLocation,
  (shortSelectedLocation) => (
    (shortSelectedLocation) ?
      `${shortSelectedLocation.latitude},${shortSelectedLocation.longitude}` :
      null
  ));

export const selectLatestMapSearchResults = createSelector(
  getMapResultsByLocation,
  (mapResultsByLocation) => mapResultsByLocation
);

export const getSearchMarker = (state) => {
  const location = state.selection.location;
  return ((location) ?
      [{ position: [location.latitude, location.longitude], type: geoSearchType }] :
      []
  );
};

export const getMarkers = createSelector(
  getSearchMarker,
  getPanoramaMarkers,
  (searchMarkers, panoramaMarkers) => (
    [...searchMarkers, ...panoramaMarkers]
  ));

export const isMarkerActive = createSelector(getDetail, (detail) => !detail);
export const isMapPanelActive = createSelector(getMap, (map) => map.mapPanelActive);

// Todo: remove this
export const getDataSelection = (state) => state.dataSelection;
