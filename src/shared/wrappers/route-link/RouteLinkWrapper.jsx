import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import RouteLink from '../../components/route-link/RouteLink';

const RouteLinkWrapper = (props) => (
  <Provider store={window.reduxStore}>
    <RouteLink {...props} />
  </Provider>
);

export default RouteLinkWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.RouteLinkWrapper = RouteLinkWrapper;
