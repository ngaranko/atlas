import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Map from '../../containers/map/map';

const MapWrapper = () => (
  <Provider store={window.reduxStore}>
    <Map />
  </Provider>
);

export default MapWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.MapWrapper = MapWrapper;
