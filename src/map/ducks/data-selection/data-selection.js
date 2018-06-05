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
