import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailExplosievenVerdachtGebied = ({ panoUrl, verdachtGebied, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={verdachtGebied.label}
    title="Verdacht gebied"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Hoofdgroep"
        value={verdachtGebied.type}
      />
      <MapDetailResultItem
        label="Subsoort"
        value={verdachtGebied.subType}
      />
      <MapDetailResultItem
        label="Opmerkingen"
        value={verdachtGebied.remarks}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailExplosievenVerdachtGebied.propTypes = {
  verdachtGebied: PropTypes.shape({
    label: PropTypes.string,
    remarks: PropTypes.string,
    subType: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailExplosievenVerdachtGebied;
