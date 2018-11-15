import { createSelector } from 'reselect';
import { getDataSelectionView, VIEWS } from '../data-selection/data-selection';
import { isMapPage, isPanoPage } from '../../../store/redux-first-router';
import { ROUTER_NAMESPACE } from '../../../app/routes';

export const REDUCER_KEY = 'ui';

export const HIDE_EMBED_PREVIEW = `${REDUCER_KEY}/HIDE_EMBED_PREVIEW`;
export const HIDE_PRINT = `${REDUCER_KEY}/HIDE_PRINT`;
export const SHOW_EMBED_PREVIEW = `${REDUCER_KEY}/SHOW_EMBED_PREVIEW`;
export const SHOW_PRINT = `${REDUCER_KEY}/SHOW_PRINT`;
export const TOGGLE_MAP_PANEL_HANDLE = `${REDUCER_KEY}/TOGGLE_MAP_PANEL_HANDLE`;

export const initialState = {
  isMapPanelHandleVisible: true,
  isEmbedPreview: false,
  isEmbed: false,
  isPrintMode: false
};

export default function UiReducer(state = initialState, action) {
  if (action.type && action.type.startsWith(ROUTER_NAMESPACE)) {
    const { embedPreview, embed, print } = action.meta.query || {};
    return {
      ...state,
      isEmbedPreview: (embedPreview === 'true'),
      isEmbed: (embed === 'true'),
      isPrintMode: (print === 'true')
    };
  }

  switch (action.type) {
    case HIDE_EMBED_PREVIEW:
      return {
        ...state,
        isEmbedPreview: false,
        isEmbed: false
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
export const showEmbedPreview = () => ({ type: SHOW_EMBED_PREVIEW });
export const showPrintMode = () => ({ type: SHOW_PRINT });
export const hidePrintMode = () => ({ type: HIDE_PRINT });
export const hideEmbedMode = () => ({ type: HIDE_EMBED_PREVIEW });
export const toggleMapPanelHandle = () => ({ type: 'NOOP' });

// Selectors
const getUIState = (state) => state.ui;
export const isEmbedded = createSelector(getUIState, (ui) => ui.isEmbed);
export const isEmbedPreview = createSelector(getUIState, (ui) => ui.isEmbedPreview);
export const isPrintMode = createSelector(getUIState, (ui) => ui.isPrintMode);
export const isInPrintorEmbedMode = createSelector(
  isEmbedded,
  isPrintMode,
  isEmbedPreview,
  (embedded, print, preview) =>
    Boolean(embedded || print || preview));
export const isMapLayersVisible = createSelector(getUIState, (ui) => ui.isMapLayersVisible);
export const isMapPanelHandleVisible =
  createSelector(getUIState, (ui) => ui.isMapPanelHandleVisible);

export const isPrintModeLandscape = createSelector(
  isPrintMode,
  isPanoPage,
  isMapPage,
  getDataSelectionView,
  (printMode, panoPageActive, mapPageActive, dataSelectionView) =>
    (printMode && (panoPageActive || mapPageActive || (dataSelectionView === VIEWS.LIST)))
);
