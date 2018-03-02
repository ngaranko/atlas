import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import GrexGrafiekB from '../../components/graphs/grex-grafiek-b/GrexGrafiekB';

const GraphWrapperB = (props) => <GrexGrafiekB data={props.data} />;

GraphWrapperB.defaultProps = {
  data: []
};

GraphWrapperB.propTypes = {
  data: PropTypes.array  // eslint-disable-line
};

export default GraphWrapperB;

window.React = window.React || React;
window.render = window.render || render;
window.GraphWrapperB = GraphWrapperB;
