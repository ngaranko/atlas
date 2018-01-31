import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';

const MapDetailNapPeilmerk = ({ panoUrl, peilmerk, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={peilmerk.label}
    title="NAP Peilmerk"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Hoogte NAP"
        value={peilmerk.height && `${peilmerk.height} m`}
      />
      <MapDetailResultItem
        label="Jaar"
        value={peilmerk.year && peilmerk.year.toString()}
      />
      <MapDetailResultItem
        label="Omschrijving"
        value={peilmerk.description}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailNapPeilmerk.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  peilmerk: PropTypes.shape({
    description: PropTypes.string,
    height: PropTypes.string,
    label: PropTypes.string,
    year: PropTypes.number
  }).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailNapPeilmerk;
