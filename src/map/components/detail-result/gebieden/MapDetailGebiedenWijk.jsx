import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenWijk = ({ panoUrl, wijk }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={wijk.label}
    title="Wijk"
  />
);

MapDetailGebiedenWijk.propTypes = {
  wijk: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailGebiedenWijk;
