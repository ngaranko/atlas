import React from 'react';
import { Provider } from 'react-redux';

import DemoContainer from '../../containers/demo/DemoContainer.jsx';

const HelloWorld = () => (
  <Provider store={window.reduxStore}>
    <DemoContainer></DemoContainer>
  </Provider>
);

export default HelloWorld;
