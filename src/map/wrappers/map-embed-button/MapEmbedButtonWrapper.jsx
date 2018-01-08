import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import MapEmbedButton from '../../components/map-embed-button/MapEmbedButton';

const MapEmbedButtonWrapper = (props) => <MapEmbedButton link={props.embedLink} />;

MapEmbedButtonWrapper.propTypes = {
  embedLink: PropTypes.string.isRequired
};

export default MapEmbedButtonWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.MapEmbedButtonWrapper = MapEmbedButtonWrapper;
