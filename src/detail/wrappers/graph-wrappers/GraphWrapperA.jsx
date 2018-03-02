import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import GrexGrafiekA from '../../components/graphs/grex-grafiek-a/GrexGrafiekA';

const GraphWrapperA = (props) => <GrexGrafiekA data={props.data} />;

GraphWrapperA.defaultProps = {
  data: []
};

GraphWrapperA.propTypes = {
  data: PropTypes.array  // eslint-disable-line
};

export default GraphWrapperA;

window.React = window.React || React;
window.render = window.render || render;
window.GraphWrapperA = GraphWrapperA;
