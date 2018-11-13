import {
  HIDE_EMBED_PREVIEW,
  HIDE_PRINT,
  initialState,
  isEmbedPreview,
  isPrintMode,
  SHOW_EMBED_PREVIEW,
  SHOW_PRINT
} from './ui';

export default {
  embedPreview: {
    selector: isEmbedPreview,
    defaultValue: initialState.isEmbedPreview,
    addHistory: true
  },
  print: {
    selector: isPrintMode,
    defaultValue: initialState.isPrintMode,
    addHistory: true
  }
};

export const ACTIONS = [SHOW_EMBED_PREVIEW, HIDE_EMBED_PREVIEW, SHOW_PRINT, HIDE_PRINT];
