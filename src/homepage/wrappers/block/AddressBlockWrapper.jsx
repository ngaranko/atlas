import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AddressBlockContainer from '../../containers/block/AddressBlockContainer';

const AddressBlockWrapper = (props) => (
  <Provider store={window.reduxStore}>
    <AddressBlockContainer {...props} />
  </Provider>
);

export default AddressBlockWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.AddressBlockWrapper = AddressBlockWrapper;
