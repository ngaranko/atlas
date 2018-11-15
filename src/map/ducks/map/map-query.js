import {
  getLatitude,
  getLongitude,
  getMapOverlays,
  getMapZoom,
  isMapPanelActive
} from './map-selectors';
import {
  initialState,
  MAP_PAN,
  MAP_ZOOM,
  TOGGLE_MAP_OVERLAY,
  TOGGLE_MAP_OVERLAY_VISIBILITY,
  TOGGLE_MAP_PANEL
} from './map';

const compressOverlays = (state) => (
  btoa(
    getMapOverlays(state).map((overlay) => `${overlay.id}:${overlay.isVisible ? 1 : 0}`).join('|')
  )
);

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
  },
  lagen: {
    selector: compressOverlays,
    defaultValue: ''
  }
};

export const ACTIONS = [
  MAP_PAN,
  MAP_ZOOM,
  TOGGLE_MAP_PANEL,
  TOGGLE_MAP_OVERLAY,
  TOGGLE_MAP_OVERLAY_VISIBILITY
];
