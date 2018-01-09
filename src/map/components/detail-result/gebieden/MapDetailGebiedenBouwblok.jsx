import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultWrapper from '../MapDetailResultWrapper';

const MapDetailGebiedenBouwblok = ({ panoUrl, bouwblok }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={bouwblok.label}
    title="Bouwblok"
  />
);

MapDetailGebiedenBouwblok.propTypes = {
  bouwblok: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailGebiedenBouwblok;
