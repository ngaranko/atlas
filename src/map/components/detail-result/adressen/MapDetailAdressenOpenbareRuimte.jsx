import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailAdressenOpenbareRuimte = ({ panoUrl, openbareRuimte, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={openbareRuimte.label}
    onMaximize={onMaximize}
    title={openbareRuimte.type}
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Status"
        value={openbareRuimte.status}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenOpenbareRuimte.propTypes = {
  openbareRuimte: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailAdressenOpenbareRuimte;
