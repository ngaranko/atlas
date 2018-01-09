export const HIDE_MAP_PANEL = 'HIDE_MAP_PANEL';
export const SHOW_MAP_PANEL = 'SHOW_MAP_PANEL';
export const TOGGLE_MAP_PANEL = 'TOGGLE_MAP_PANEL';
export const TOGGLE_MAP_PANEL_HANDLE = 'TOGGLE_MAP_PANEL_HANDLE';
export const TOGGLE_MAP_FULLSCREEN = 'TOGGLE_MAP_FULLSCREEN';

const initialState = {
  isMapPanelVisible: false,
  isMapPanelHandleVisible: true,
  isMapFullscreen: false
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_MAP_PANEL:
      return {
        ...state,
        isMapPanelVisible: false
      };

    case SHOW_MAP_PANEL:
      return {
        ...state,
        isMapPanelVisible: true
      };

    case TOGGLE_MAP_PANEL:
      return {
        ...state,
        isMapPanelVisible: !state.isMapPanelVisible
      };

    case TOGGLE_MAP_PANEL_HANDLE:
      return {
        ...state,
        isMapPanelHandleVisible: !state.isMapPanelHandleVisible
      };

    case TOGGLE_MAP_FULLSCREEN:
      return {
        ...state,
        isMapFullscreen: !state.isMapFullscreen
      };

    default:
      return state;
  }
}

export const hideMapPanel = () => ({ type: HIDE_MAP_PANEL });
export const showMapPanel = () => ({ type: SHOW_MAP_PANEL });
export const toggleMapPanel = () => ({ type: TOGGLE_MAP_PANEL });
export const toggleMapPanelHandle = () => ({ type: TOGGLE_MAP_PANEL_HANDLE });
export const toggleMapFullscreen = () => ({ type: TOGGLE_MAP_FULLSCREEN });

window.reducers = window.reducers || {};
window.reducers.UiReducer = UiReducer;
