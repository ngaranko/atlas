import React from 'react';
import { Provider } from 'react-redux';

import SearchContainer from '../../containers/search/SearchContainer';

const SearchWrapper = () => (
  <Provider store={window.reduxStore}>
    <SearchContainer />
  </Provider>
);

export default SearchWrapper;

window.SearchWrapper = SearchWrapper;
