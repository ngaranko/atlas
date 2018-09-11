import queryString from 'query-string';
import ACTIONS from './shared/actions';

export default (history, store) => {
  // eslint-disable-next-line no-unused-vars
  const unlisten = history.listen((location, action) => {
    const hash = location.hash; // '#?foo=bar&abc=xyz'
    let params;
    if (hash.length > 0 && hash[0] === '#') {
      const search = hash.slice(1); // '?foo=bar&abc=xyz'
      params = queryString.parse(search);
    } else {
      params = {};
    }

    store.dispatch({
      type: ACTIONS.URL_CHANGE,
      payload: params
    });
  });
};
