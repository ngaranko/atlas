export const TOGGLE_MAP_LAYERS = 'TOGGLE_MAP_LAYERS';

const initialState = {
  ui: {
    isMapLayersVisible: true
  }
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MAP_LAYERS:
      return { ...state, ui: { ...state.ui, isMapLayersVisible: !state.ui.isMapLayersVisible } };

    default:
      return state;
  }
}

export const toggleMapLayers = () => ({ type: TOGGLE_MAP_LAYERS });

window.reducers = window.reducers || {};
window.reducers.UiReducer = UiReducer;
