import React from 'react';
import Link from 'redux-first-router-link';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import { routing } from '../../../app/routes';

const MapEmbedButton = () => (
  <Link // eslint-disable-line jsx-a11y/anchor-is-valid
    to={routing.map.type}
    title="Naar interactieve kaart (Amsterdam City Data)"
    className="c-embed-button qa-embed-button"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MaximizeIcon className="c-embed-button__icon" />
    <span className="c-embed-button__label">City Data</span>
  </Link>
);

export default MapEmbedButton;
