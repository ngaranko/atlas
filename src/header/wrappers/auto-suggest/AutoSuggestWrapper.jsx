import React from 'react';
import { Provider } from 'react-redux';

import AutoSuggestContainer from '../../containers/auto-suggest/AutoSuggestContainer';

const AutoSuggestWrapper = (props) => (
  <Provider store={window.reduxStore}>
    <AutoSuggestContainer {...props} />
  </Provider>
);

export default AutoSuggestWrapper;
