import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import HomepageAddressBlockContainer from '../../containers/address-block/HomepageAddressBlockContainer';

const HomepageAddressBlockWrapper = (props) => (
  <Provider store={window.reduxStore}>
    <HomepageAddressBlockContainer {...props} />
  </Provider>
);

export default HomepageAddressBlockWrapper;

window.React = window.React || React;
// istanbul ignore next
window.render = window.render || render;
window.HomepageAddressBlockWrapper = HomepageAddressBlockWrapper;
