import { createSelector } from 'reselect';

import QueryStringParser from '../../../shared/services/query-string-parser/query-string-parser';
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config';

const getState = (state) => state;
const getUi = (state) => state.ui;

const getEmbedLink = createSelector([getUi, getState], (ui) => {
  if (!ui.isEmbed && !ui.isEmbedPreview) {
    return '';
  }
  const hash = QueryStringParser(window.location.hash.substring(1));
  if (hash && hash.atep) {
    delete hash.atep;
  }
  if (hash && hash.ate) {
    delete hash.ate;
  }
  const newQueryString = Object.keys(hash)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(hash[key])}`)
    .join('&');
  return `${SHARED_CONFIG.ROOT}#?${newQueryString}`;
});

export default getEmbedLink;
