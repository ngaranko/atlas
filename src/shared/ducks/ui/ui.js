export const TOGGLE_MAP_PANEL_HANDLE = 'TOGGLE_MAP_PANEL_HANDLE';

const initialState = {
  ui: {
    isMapPanelHandleVisible: true
  }
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MAP_PANEL_HANDLE:
      return {
        ...state,
        ui: {
          ...state.ui,
          isMapPanelHandleVisible: !state.ui.isMapPanelHandleVisible
        }
      };

    default:
      return state;
  }
}

export const toggleMapPanelHandle = () => ({ type: TOGGLE_MAP_PANEL_HANDLE });

window.reducers = window.reducers || {};
window.reducers.UiReducer = UiReducer;
