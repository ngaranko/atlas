import React from 'react';
import { render } from 'react-dom';

import HomepageAddressBlock from '../../components/address-block/HomepageAddressBlock';

const HomepageAddressBlockWrapper = (props) => (
  <HomepageAddressBlock {...props} />
);

export default HomepageAddressBlockWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.HomepageAddressBlockWrapper = HomepageAddressBlockWrapper;
