import React from 'react';
import { Provider } from 'react-redux';

import MapPanelContainer from '../../containers/panel/MapPanelContainer';

const MapPanelWrapper = () => (
  <Provider store={window.reduxStore}>
    <MapPanelContainer />
  </Provider>
);

export default MapPanelWrapper;
