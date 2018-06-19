import { createSelector } from 'reselect';

import { getStraatbeeldMarkers, getStraatbeeldLocation } from '../straatbeeld/straatbeeld';
import {
  getClusterMarkers as getDataSelectionClusterMarkers,
  getDataSelection,
  getGeoJsons as getDataSelectionGeoJsons,
  getMarkers as getDataSelectionMarkers
} from '../data-selection/data-selection';
import { getSearchMarker } from '../search-results/map-search-results';
import { getGeoJson as getDetailGeoJson } from '../detail/map-detail';

export const getMap = (state) => state.map;
export const getActiveBaseLayer = createSelector(getMap, (mapState) => mapState.baseLayer);
export const getMapZoom = createSelector(getMap, (mapState) => mapState.zoom);

export const getMapOverlays = createSelector(getMap, (mapState) => mapState.overlays || []);

export const getMapCenter = createSelector(getMap, (mapState) => mapState && mapState.viewCenter);

export const getCenter = createSelector([getMapCenter, getStraatbeeldLocation],
  (mapCenter, straatbeeldLocation) => (
    straatbeeldLocation || mapCenter
  ));

export const getMarkers = createSelector(
  [getDataSelection, getDataSelectionMarkers, getSearchMarker, getStraatbeeldMarkers],
  (dataSelectionActive, dataSelectionMarkers, searchMarkers, straatbeeldMarkers) => (
     dataSelectionActive ? dataSelectionMarkers : [...searchMarkers, ...straatbeeldMarkers]
  ));
export const getClusterMarkers = getDataSelectionClusterMarkers;
export const getGeoJsons = getDataSelectionGeoJsons;
export const getRdGeoJsons = createSelector(getDetailGeoJson, (geoJson) => [geoJson]);
