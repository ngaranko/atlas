import React from 'react';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';
import { getEmbedButtonLink } from '../../../store/query-synchronization';

const MapEmbedButton = () => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.open(getEmbedButtonLink(), '_blank');
    }}
    title="Naar interactieve kaart (Amsterdam City Data)"
    className="c-embed-button qa-embed-button"
  >
    <MaximizeIcon className="c-embed-button__icon" />
    <span className="c-embed-button__label">City Data</span>
  </button>
);

export default MapEmbedButton;
