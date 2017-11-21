const HIDE_MAP_PANEL = 'HIDE_MAP_PANEL';
const SHOW_MAP_PANEL = 'SHOW_MAP_PANEL';
const TOGGLE_MAP_PANEL = 'TOGGLE_MAP_PANEL';

const initialState = {};

export default function MapPanelReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_MAP_PANEL:
      return {
        ...state,
        ui: {
          ...state.ui,
          isMapPanelVisible: false
        }
      };

    case SHOW_MAP_PANEL:
      return {
        ...state,
        ui: {
          ...state.ui,
          isMapPanelVisible: true
        }
      };

    case TOGGLE_MAP_PANEL:
      return {
        ...state,
        ui: {
          ...state.ui,
          isMapPanelVisible: !state.ui.isMapPanelVisible
        }
      };

    default:
      return state;
  }
}

export const hideMapPanel = () => ({ type: HIDE_MAP_PANEL });
export const showMapPanel = () => ({ type: SHOW_MAP_PANEL });
export const toggleMapPanel = () => ({ type: TOGGLE_MAP_PANEL });

window.reducers = window.reducers || {};
window.reducers.MapPanelReducer = MapPanelReducer;
