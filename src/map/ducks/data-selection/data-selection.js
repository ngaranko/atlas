import { createSelector } from 'reselect';

import { detailPointType } from '../../components/leaflet/services/icons.constant';

const generateMarkers = (markers) => (
  markers.map((markerLocation) => ({
    position: markerLocation,
    type: detailPointType
  })));

export const getDataSelection = (state) => state.dataSelection;

export const getClusterMarkers = createSelector([getDataSelection],
  (dataSelection) => (
    dataSelection && dataSelection.markers && dataSelection.markers.length ?
      generateMarkers(dataSelection.markers) : []
    )
  );
