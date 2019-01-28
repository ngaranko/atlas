import queryStringParser from './shared/services/query-string-parser/query-string-parser';
import ACTIONS from './shared/actions';


/**
 * Given a store, create a function that will update the Redux store for a location object.
 *
 */

export default (store) => (location) => {
  const hash = location.hash; // '#?foo=bar&abc=xyz'
  let params;
  if (hash.length > 0 && hash[0] === '#') {
    const search = hash.slice(1); // '?foo=bar&abc=xyz'
    params = queryStringParser(search);
  } else {
    params = {};
  }

  store.dispatch({
    type: ACTIONS.URL_CHANGE,
    payload: params
  });
};
