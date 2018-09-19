import stateUrlConverter from './state-url-converter';
// eslint-disable-next-line no-unused-vars
import queryStringParser, { encodeQueryParams } from '../query-string-parser/query-string-parser';

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
  // console.log('isHashChanged');
  // console.log(locationHash);
  // console.log(hash);
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
    // console.log('stateToUrl.update called');
    // console.log(location.hash);
    // console.log(hash);

    if (!isHashChanged(location.hash, hash)) return;
    console.log('updating url hash (location.hash and hash are different)'); // eslint-disable-line no-console
    if (useReplace) {
      // debugger;
      console.log('replace', hash); // eslint-disable-line no-console
      history.replace(hash);
    } else {
      console.log('push', hash); // eslint-disable-line no-console
      history.push(hash);
    }
  }
};

export default stateToUrl;

