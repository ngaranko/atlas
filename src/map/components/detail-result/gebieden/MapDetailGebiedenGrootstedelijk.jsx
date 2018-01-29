import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenGrootstedelijk = ({ panoUrl, grootstedelijk, onMaximize }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    subTitle={grootstedelijk.label}
    title="Grootstedelijk gebied"
  />
);

MapDetailGebiedenGrootstedelijk.propTypes = {
  grootstedelijk: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired
};

export default MapDetailGebiedenGrootstedelijk;
