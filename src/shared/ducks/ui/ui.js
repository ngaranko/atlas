export const HIDE_EMBED_PREVIEW = 'HIDE_EMBED_PREVIEW';
export const HIDE_PRINT = 'HIDE_PRINT';
export const SHOW_EMBED_PREVIEW = 'SHOW_EMBED_PREVIEW';
export const SHOW_PRINT = 'SHOW_PRINT';
export const TOGGLE_MAP_PANEL_HANDLE = 'TOGGLE_MAP_PANEL_HANDLE';

const initialState = {
  isMapPanelHandleVisible: true
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case HIDE_EMBED_PREVIEW:
      return {
        ...state,
        isEmbedPreview: false
      };

    case HIDE_PRINT:
      return {
        ...state,
        isPrintMode: false
      };

    case SHOW_EMBED_PREVIEW:
      return {
        ...state,
        isEmbedPreview: true
      };

    case SHOW_PRINT:
      return {
        ...state,
        isPrintMode: true
      };

    case TOGGLE_MAP_PANEL_HANDLE:
      return {
        ...state,
        isMapPanelHandleVisible: !state.isMapPanelHandleVisible
      };

    default:
      return state;
  }
}

// Todo: wire these actions properly when ui reducer is obsolete
export const toggleMapFullscreen = () => ({ type: 'NOOP' });
export const setMapFullscreen = () => ({ type: 'NOOP' });
export const toggleMapPanelHandle = () => ({ type: 'NOOP' });
