import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenGebiedsgerichtWerken = ({
  panoUrl, gebiedsgerichtWerken, onMaximize, onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={gebiedsgerichtWerken.label}
    title="Gebiedsgerichtwerken-gebied"
  />
);

MapDetailGebiedenGebiedsgerichtWerken.propTypes = {
  gebiedsgerichtWerken: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailGebiedenGebiedsgerichtWerken;
