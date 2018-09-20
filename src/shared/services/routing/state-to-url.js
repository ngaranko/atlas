import stateUrlConverter from './state-url-converter';
import queryStringParser from '../query-string-parser/query-string-parser';

export const paramsToQuery = (params) => (params ? Object.keys(params)
  .map((param) => `${param}=${params[param]}`)
  .join('&') : '');

const getSanitizedHash = (params) => {
  const regex = new RegExp('%3A', 'g');
  const result = `#?${paramsToQuery(params)}`.replace(regex, ':');
  const regexSlash = new RegExp('/', 'g');
  return result.replace(regexSlash, '%2F');
};

const isHashChanged = (locationHash, hash) => {
  if (locationHash === hash) return false;
  const params = queryStringParser(locationHash.slice(1));
  const testHash = getSanitizedHash(params);
  return (testHash !== hash);
};

const stateToUrl = {
  update: (state, useReplace) => {
    const history = window.globalHistory;
    const location = history.location;

    const params = stateUrlConverter.state2params(state);
    const hash = getSanitizedHash(params);

    if (!isHashChanged(location.hash, hash)) return;

    // eslint-disable-next-line no-console
    // console.log('updating url hash (location.hash and hash are different)');
    if (useReplace) {
      console.log('replace', hash); // eslint-disable-line no-console
      history.replace(hash);
    } else {
      console.log('push', hash); // eslint-disable-line no-console
      history.push(hash);
    }
  }
};

export default stateToUrl;

