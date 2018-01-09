import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailAdressenLigplaats = ({ panoUrl, ligplaats }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={ligplaats.label}
    title="Ligplaats"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Status"
        value={ligplaats.status}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenLigplaats.propTypes = {
  ligplaats: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailAdressenLigplaats;
