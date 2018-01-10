import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenUnesco = ({ panoUrl, unesco }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={unesco.label}
    title="UNESCO"
  />
);

MapDetailGebiedenUnesco.propTypes = {
  unesco: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailGebiedenUnesco;
