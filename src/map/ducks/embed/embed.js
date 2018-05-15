import QueryStringParser from '../../../shared/services/query-string-parser/query-string-parser';
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config';

const getEmbedLink = (state) => { //eslint-disable-line
  const hash = QueryStringParser(window.location.hash.substring(1));
  delete hash.atep;
  const newQueryString = Object.keys(hash)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(hash[key])}`)
    .join('&');
  return `${SHARED_CONFIG.ROOT}#?${newQueryString}`;
};

export default getEmbedLink;
