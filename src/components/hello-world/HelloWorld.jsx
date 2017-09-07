import React from 'react';
import { Provider } from 'react-redux';

import DemoContainer from '../../containers/demo/DemoContainer';

const HelloWorld = () => (
  <Provider store={window.reduxStore}>
    <DemoContainer />
  </Provider>
);

export default HelloWorld;
