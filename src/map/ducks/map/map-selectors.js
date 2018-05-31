import { createSelector } from 'reselect';

import { getStraatbeeldMarkers, getStraatbeeldLocation } from '../straatbeeld/straatbeeld';
import { getDataSelection } from '../data-selection/data-selection';
import { getSearchMarker } from '../search-results/map-search-results';

export const getMap = (state) => state.map;
export const getActiveBaseLayer = createSelector(getMap, (mapState) => mapState.baseLayer);
export const getMapZoom = createSelector(getMap, (mapState) => mapState.zoom);

export const getMapOverlays = createSelector(getMap, (mapState) => mapState.overlays || []);

export const getMarkers = createSelector(
  [getDataSelection, getSearchMarker, getStraatbeeldMarkers],
  (dataSelectionActive, searchMarkers, straatbeeldMarkers) => (
     !dataSelectionActive ? [...searchMarkers, ...straatbeeldMarkers] : []
  ));

export const getMapCenter = createSelector(getMap, (mapState) => mapState && mapState.viewCenter);

export const getCenter = createSelector([getMapCenter, getStraatbeeldLocation],
  (mapCenter, straatbeeldLocation) => (
    straatbeeldLocation || mapCenter
  )
);
