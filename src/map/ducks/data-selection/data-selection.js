import { createSelector } from 'reselect';

import { detail } from '../../components/leaflet/services/detail-icon';

const generateMarkers = (markers) => (
  markers.map((markerLocation) => ({
    position: markerLocation,
    type: 'detail'
  })));

export const getDataSelection = (state) => state.dataSelection;

export const getClusterMarkers = createSelector([getDataSelection],
  (dataSelection) => (
    dataSelection && dataSelection.markers && dataSelection.markers.length ?
      generateMarkers(dataSelection.markers) : []
    )
  );
