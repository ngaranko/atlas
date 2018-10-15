import { createSelector } from 'reselect';
import { isMapCurrentPage } from '../../../reducers/current-page-reducer';
import { getStraatbeeld } from '../straatbeeld/straatbeeld';

export const REDUCER_KEY = 'ui';

export const HIDE_EMBED_PREVIEW = 'HIDE_EMBED_PREVIEW';
export const HIDE_PRINT = 'HIDE_PRINT';
export const SHOW_EMBED_PREVIEW = 'SHOW_EMBED_PREVIEW';
export const SHOW_PRINT = 'SHOW_PRINT';
export const TOGGLE_MAP_PANEL_HANDLE = 'TOGGLE_MAP_PANEL_HANDLE';

const initialState = {
  isMapPanelHandleVisible: true,
  isEmbedPreview: false,
  isEmbed: false,
  isPrintMode: false
};

export default function UiReducer(state = initialState, action) {
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
        isEmbedPreview: true,
        isEmbed: true
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
    (embedded || print || preview));

// Todo: move this to a dataSelection ducks file
const getDataSelection = (state) => state.dataSelection || {};
const getDataSelectionView = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection.view
);

export const isPrintModeLandscape = createSelector(
  isPrintMode,
  getStraatbeeld,
  isMapCurrentPage,
  getDataSelectionView,
  (printMode, straatbeeldActive, mapPageActive, dataSelectionView) =>
    (printMode && (!!straatbeeldActive || mapPageActive || (dataSelectionView === 'LIST')))
);

