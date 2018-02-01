import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';

const MapDetailMeetbout = ({ panoUrl, meetbout, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
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
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailMeetbout;
