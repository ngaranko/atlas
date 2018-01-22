import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenStadsdeel = ({ panoUrl, stadsdeel, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={stadsdeel.label}
    title="Stadsdeel"
  />
);

MapDetailGebiedenStadsdeel.propTypes = {
  stadsdeel: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailGebiedenStadsdeel;
