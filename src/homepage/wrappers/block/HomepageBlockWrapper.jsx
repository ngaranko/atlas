import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import HomepageBlockContainer from '../../containers/block/HomepageBlockContainer';

const HomepageBlockWrapper = (props) => (
  <Provider store={window.reduxStore}>
    <HomepageBlockContainer {...props} />
  </Provider>
);

export default HomepageBlockWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.HomepageBlockWrapper = HomepageBlockWrapper;
