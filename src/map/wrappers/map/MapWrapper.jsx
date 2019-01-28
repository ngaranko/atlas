import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MapContainer from '../../containers/map/MapContainer';

const MapWrapper = () => (
  <Provider store={window.reduxStore}>
    <MapContainer />
  </Provider>
);

export default MapWrapper;

window.React = window.React || React;
// istanbul ignore next
window.render = window.render || render;
window.MapWrapper = MapWrapper;
