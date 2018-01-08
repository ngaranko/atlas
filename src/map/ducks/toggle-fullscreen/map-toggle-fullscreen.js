const MAP_TOGGLE_FULLSCREEN = 'MAP_TOGGLE_FULLSCREEN';

const initialState = {};

export default function MapToggleFullscreenReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_TOGGLE_FULLSCREEN:
      return {
        ...state,
        ui: {
          ...state.ui,
          isMapFullscreen: action.isMapFullscreen
        }
      };

    default:
      return state;
  }
}

export const toggleFullscreen = (isMapFullscreen) => ({
  type: MAP_TOGGLE_FULLSCREEN, isMapFullscreen });

window.reducers = window.reducers || {};
window.reducers.MapToggleFullscreenReducer = MapToggleFullscreenReducer;
