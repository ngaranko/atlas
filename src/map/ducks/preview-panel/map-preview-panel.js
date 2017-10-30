const MAXIMIZE_MAP_PREVIEW_PANEL = 'MAXIMIZE_MAP_PREVIEW_PANEL';

const initialState = {};

export default function MapPreviewPanelReducer(state = initialState, action) {
  switch (action.type) {
    case MAXIMIZE_MAP_PREVIEW_PANEL:
      return {
        ...state,
        isMapPreviewPanelVisible: false
      };

    default:
      return state;
  }
}

export const maximiszeMapPreviewPanel = () => ({ type: MAXIMIZE_MAP_PREVIEW_PANEL });

window.reducers = window.reducers || {};
window.reducers.MapPreviewPanelReducer = MapPreviewPanelReducer;
