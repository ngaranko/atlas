export const TOGGLE_MAP_OVERLAY = 'TOGGLE_MAP_OVERLAY';

const initialState = {};

export default function MapOverlaysReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MAP_OVERLAY:
      return {
        ...state,
        map: {
          ...state.map,
          overlays: state.map.overlays.some(overlay => overlay.id === action.mapLayerId) ?
            [...state.map.overlays.filter(overlay => overlay.id !== action.mapLayerId)] :
            [...state.map.overlays, { id: action.mapLayerId, isVisible: true }]
        }
      };

    default:
      return state;
  }
}

export const toggleMapOverlay = mapLayerId => ({ type: TOGGLE_MAP_OVERLAY, mapLayerId });

window.MapOverlaysReducer = MapOverlaysReducer;
