import { createSelector } from 'reselect';

import { detailPointType } from '../../components/leaflet/services/icons.constant';

const generateMarkers = (markers) => (
  markers.map((markerLocation, index) => ({
    position: markerLocation,
    type: detailPointType,
    index
  }))
);

export const getDataSelection = (state) => state.dataSelection;

export const getMarkers = createSelector([getDataSelection],
  (dataSelection) => dataSelection && dataSelection.markers
);

export const getClusterMarkers = createSelector([getMarkers],
  (markers) => (
    markers && markers.clusterMarkers && markers.clusterMarkers.length ?
      generateMarkers(markers.clusterMarkers) : []
  )
);
