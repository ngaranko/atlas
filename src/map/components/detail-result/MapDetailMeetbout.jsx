import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';

const MapDetailMeetbout = ({ panoUrl, meetbout, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={meetbout.label}
    title="Meetbout"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Status"
        value={meetbout.status}
      />
      <MapDetailResultItem
        label="Adres"
        value={meetbout.address}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailMeetbout.propTypes = {
  meetbout: PropTypes.shape({
    address: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailMeetbout;
