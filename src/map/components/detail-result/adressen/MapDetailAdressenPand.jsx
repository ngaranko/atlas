import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const statusToCssModifier = {
  24: 'info',
  25: 'info',
  26: 'info',
  27: 'info',
  28: 'info',
  29: 'info',
  32: 'info'
};

const MapDetailAdressenPand = ({ panoUrl, pand, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={pand.label}
    title="Pand"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Oorspronkelijk bouwjaar"
        value={pand.year || 'onbekend'}
      />
      <MapDetailResultItem
        label="Naam"
        value={pand.name}
      />
      <MapDetailResultStatusItem
        label="Status"
        value={pand.status.description}
        status={statusToCssModifier[pand.status.code]}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenPand.propTypes = {
  pand: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    }).isRequired,
    name: PropTypes.string,
    year: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenPand;
