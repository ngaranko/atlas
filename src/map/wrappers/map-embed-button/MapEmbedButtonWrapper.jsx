import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';

const MapEmbedButtonWrapper = () => (
  <Provider store={window.reduxStore}>
    <MapEmbedButton />
  </Provider>
);

export default MapEmbedButtonWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.MapEmbedButtonWrapper = MapEmbedButtonWrapper;
