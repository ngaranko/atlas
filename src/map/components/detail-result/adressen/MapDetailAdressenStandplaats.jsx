import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailAdressenStandplaats = ({ panoUrl, standplaats, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={standplaats.label}
    title="Standplaats"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Status"
        value={standplaats.status}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenStandplaats.propTypes = {
  standplaats: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailAdressenStandplaats;
