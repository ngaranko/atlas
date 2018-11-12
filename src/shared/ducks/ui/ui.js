import { createSelector } from 'reselect';
import { getStraatbeeld } from '../straatbeeld/straatbeeld';
import { getDataSelectionView, VIEWS } from '../data-selection/data-selection';
import { isMapPage } from '../../../store/redux-first-router';
import { routing } from '../../../app/routes';

export const REDUCER_KEY = 'ui';

export const HIDE_EMBED_PREVIEW = 'HIDE_EMBED_PREVIEW';
export const HIDE_PRINT = 'HIDE_PRINT';
export const SHOW_EMBED_PREVIEW = 'SHOW_EMBED_PREVIEW';
export const SHOW_PRINT = 'SHOW_PRINT';
export const TOGGLE_MAP_PANEL_HANDLE = 'TOGGLE_MAP_PANEL_HANDLE';

export const initialState = {
  isMapPanelHandleVisible: true,
  isEmbedPreview: false,
  isEmbed: false,
  isPrintMode: false
};

export default function UiReducer(state = initialState, action) {
  switch (action.type) {
    case routing.map.type: {
      const { embedPreview, embed } = action.meta.query || {};
      return {
        ...state,
        isEmbedPreview: (embedPreview === 'true') || initialState.isEmbedPreview,
        isEmbed: (embed === 'true') || initialState.isEmbed
      };
    }
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
  getStraatbeeld,
  isMapPage,
  getDataSelectionView,
  (printMode, straatbeeldActive, mapPageActive, dataSelectionView) =>
    (printMode && (!!straatbeeldActive || mapPageActive || (dataSelectionView === VIEWS.LIST)))
);

