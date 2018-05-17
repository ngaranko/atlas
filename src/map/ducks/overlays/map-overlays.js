import { createSelector } from 'reselect';

import { getMap } from '../map/map';

export const TOGGLE_MAP_OVERLAY = 'TOGGLE_MAP_OVERLAY';
export const TOGGLE_MAP_OVERLAYS = 'TOGGLE_MAP_OVERLAYS';
export const TOGGLE_MAP_OVERLAY_VISIBILITY = 'TOGGLE_MAP_OVERLAY_VISIBILITY';
export const TOGGLE_MAP_PANEL = 'TOGGLE_MAP_PANEL';

export const getMapOverlays = createSelector(getMap, (mapState) => mapState.overlays);

const initialState = {};

export default function MapOverlaysReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MAP_OVERLAY:
      return {
        ...state,
        map: {
          ...state.map,
          overlays: state.map.overlays.some((overlay) => overlay.id === action.mapLayerId) ?
            [...state.map.overlays.filter((overlay) => overlay.id !== action.mapLayerId)] :
            [...state.map.overlays, { id: action.mapLayerId, isVisible: true }]
        }
      };

    case TOGGLE_MAP_OVERLAY_VISIBILITY:
      return {
        ...state,
        map: {
          ...state.map,
          overlays: state.map.overlays.map((overlay) => ({
            ...overlay,
            isVisible: overlay.id !== action.mapLayerId ? overlay.isVisible :
              (action.show !== undefined ? action.show : !overlay.isVisible)
          }))
        }
      };

    default:
      return state;
  }
}

export const toggleMapOverlay = (mapLayerId) => ({ type: TOGGLE_MAP_OVERLAY, mapLayerId });
export const toggleMapOverlayVisibility = (mapLayerId, show) => ({
  type: TOGGLE_MAP_OVERLAY_VISIBILITY,
  mapLayerId,
  show
});
export const toggleMapPanel = () => ({ type: TOGGLE_MAP_PANEL });

window.reducers = window.reducers || {};
window.reducers.MapOverlaysReducer = MapOverlaysReducer;
