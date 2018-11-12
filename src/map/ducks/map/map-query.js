import { getLatitude, getLongitude, getMapZoom, isMapPanelActive } from './map-selectors';
import { initialState, MAP_PAN, MAP_ZOOM, TOGGLE_MAP_PANEL } from './map';

export default {
  lat: {
    selector: getLatitude,
    defaultValue: initialState.viewCenter[0]
  },
  lng: {
    selector: getLongitude,
    defaultValue: initialState.viewCenter[1]
  },
  zoom: {
    selector: getMapZoom,
    defaultValue: initialState.zoom
  },
  legenda: {
    selector: isMapPanelActive,
    defaultValue: initialState.mapPanelActive
  }
};

export const ACTIONS = [MAP_PAN, MAP_ZOOM, TOGGLE_MAP_PANEL];
