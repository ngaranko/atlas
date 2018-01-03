import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenBuurt = ({ panoUrl, buurt }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={buurt.label}
    title="Buurt"
  />
);

MapDetailGebiedenBuurt.propTypes = {
  buurt: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailGebiedenBuurt;
