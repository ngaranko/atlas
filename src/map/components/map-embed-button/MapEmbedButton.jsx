import React from 'react';
import PropTypes from 'prop-types';

const MapEmbedButton = ({ link }) => (
  <a
    href={link}
    title="Naar interactieve kaart (Amsterdam City Data)"
    className="c-embed-button qa-embed-button"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="c-embed-button__icon c-embed-button__icon--maximize" />
    <span className="c-embed-button__label">City Data</span>
  </a>
);

MapEmbedButton.propTypes = {
  link: PropTypes.string.isRequired
};

export default MapEmbedButton;
