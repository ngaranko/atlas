import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenGrootstedelijk = ({ panoUrl, grootstedelijk }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={grootstedelijk.label}
    title="Grootstedelijk gebied"
  />
);

MapDetailGebiedenGrootstedelijk.propTypes = {
  grootstedelijk: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailGebiedenGrootstedelijk;
