import { createSelector } from 'reselect';

import { detailPointType } from '../../components/leaflet/services/icons.constant';

const generateMarkers = (markers) => (
  markers.map((markerLocation, index) => ({
    position: markerLocation,
    type: detailPointType,
    index
  })));

export const getDataSelection = (state) => state.dataSelection;

export const getMapData = createSelector([getDataSelection],
  (dataSelection) => dataSelection && dataSelection.markers);

export const getClusterMarkers = createSelector([getMapData],
  (markers) => (
    markers && markers.clusterMarkers && markers.clusterMarkers.length ?
      generateMarkers(markers.clusterMarkers) : []
  ));

export const getGeoJsons = createSelector([getMapData],
  (markers) => (
    markers && markers.geoJsons && markers.geoJsons.length ?
      markers.geoJsons : []
  ));

export const getMarkers = createSelector([getMapData],
  (markers) => (
    markers && markers.markers && markers.markers.length ?
      markers.markers : []
  ));
