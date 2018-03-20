import React from 'react';
import { Provider } from 'react-redux';

import Search from './Search';

const SearchWrapper = () => (
  <Provider store={window.reduxStore}>
    <Search />
  </Provider>
);

export default SearchWrapper;

window.SearchWrapper = SearchWrapper;
