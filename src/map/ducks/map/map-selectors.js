import { createSelector } from 'reselect';

import {
  getStraatbeeldLocation,
  getStraatbeeldMarkers
} from '../../../shared/ducks/straatbeeld/straatbeeld';
import {
  getClusterMarkers as getDataSelectionClusterMarkers,
  getGeoJsons as getDataSelectionGeoJsons
} from '../data-selection/data-selection';
import { getGeoJson as getDetailGeoJson } from '../detail/map-detail';
import { geoSearchType } from '../../components/leaflet/services/icons.constant';
import { getMapResultsByLocation } from '../../../shared/ducks/search/search';
import { getDetail } from '../../../shared/ducks/detail/detail';
import drawToolConfig from '../../services/draw-tool/draw-tool.config';

export const getMap = (state) => state.map;
export const getActiveBaseLayer = createSelector(getMap, (mapState) => mapState.baseLayer);
export const getMapZoom = createSelector(getMap, (mapState) => mapState.zoom);

export const getMapOverlays = createSelector(getMap, (mapState) => mapState.overlays || []);

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

export const getCenter = createSelector([getMapCenter, getStraatbeeldLocation],
  (mapCenter, straatbeeldLocation) => (
    straatbeeldLocation || mapCenter
  ));

export const getClusterMarkers = getDataSelectionClusterMarkers;
export const getGeoJsons = getDataSelectionGeoJsons;
export const getRdGeoJsons = createSelector(getDetailGeoJson, (geoJson) => [geoJson]);

// Selected location
export const getSelectedLocationString = (state) => state.map.selectedLocation;

export const getSelectedLocation = createSelector(
  getSelectedLocationString,
  (location) => (
    (location) ? {
      lat: parseFloat(location.split(',')[0]),
      lng: parseFloat(location.split(',')[1])
    } : null
  ));

export const getShortSelectedLocation = createSelector(
  getSelectedLocation,
  (selectedLocation) => (
    (selectedLocation) ? ({
      latitude: +parseFloat(selectedLocation.lat).toFixed(7),
      longitude: +parseFloat(selectedLocation.lng).toFixed(7)
    }) : null
  ));

export const getLocationId = createSelector(
  getShortSelectedLocation,
  (shortSelectedLocation) => (
    (shortSelectedLocation) ?
      `${shortSelectedLocation.latitude},${shortSelectedLocation.longitude}` :
      null
  ));

export const selectLatestMapSearchResults = createSelector(
  getLocationId,
  getMapResultsByLocation,
  (locationString, mapResultsByLocation) => {
    return mapResultsByLocation[locationString]
  }
);

export const getSearchMarker = createSelector(
  getShortSelectedLocation,
  (location) =>
    ((location) ? [{ position: [location.latitude, location.longitude], type: geoSearchType }] : [])
);

export const getMarkers = createSelector(
  getSearchMarker,
  getStraatbeeldMarkers,
  (searchMarkers, straatbeeldMarkers) => (
    [...searchMarkers, ...straatbeeldMarkers]
  ));

export const isMarkerActive = createSelector(getDetail, (detail) => !detail);
export const isMapPanelActive = createSelector(getMap, (map) => map.mapPanelActive);
