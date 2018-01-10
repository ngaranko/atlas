import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultDateItem from '../MapDetailResultDateItem';
import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailExplosievenInslag = ({ panoUrl, inslag }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={inslag.label}
    title="Inslag"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultDateItem
        label="Datum van inslag"
        date={inslag.date}
      />
      <MapDetailResultItem
        label="Soort handeling"
        value={inslag.type}
      />
      <MapDetailResultItem
        label="Bron"
        value={inslag.source}
      />
      <MapDetailResultItem
        label="Opmerkingen"
        value={inslag.remarks}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailExplosievenInslag.propTypes = {
  inslag: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    label: PropTypes.string,
    remarks: PropTypes.string,
    source: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailExplosievenInslag;
