import queryStringParser from './shared/services/query-string-parser/query-string-parser';
import ACTIONS from './shared/actions';


const locationHandler = (store) => (location, action) => { // eslint-disable-line no-unused-vars
  // console.log('location handler called, action =', action); // eslint-disable-line no-console
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

export default locationHandler;
