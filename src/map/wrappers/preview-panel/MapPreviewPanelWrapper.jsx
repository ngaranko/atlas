import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MapPreviewPanelContainer from '../../containers/preview-panel/MapPreviewPanelContainer';

const MapPreviewPanelWrapper = () => (
  <Provider store={window.reduxStore}>
    <MapPreviewPanelContainer />
  </Provider>
);

export default MapPreviewPanelWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.MapPreviewPanelWrapper = MapPreviewPanelWrapper;
