import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MapPanelContainer from '../../containers/panel/MapPanelContainer';

const MapPanelWrapper = () => (
  <Provider store={window.reduxStore}>
    <MapPanelContainer />
  </Provider>
);

export default MapPanelWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.MapPanelWrapper = MapPanelWrapper;
