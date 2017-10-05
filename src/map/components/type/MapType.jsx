import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

const MapType = ({ layers }) => (
  <section className="map-panel__map-type">maptype
    <Select name="topography" value="topo_rd" options={layers.topography} />

    <Select name="aerial" value="lf2017" options={layers.aerial} />
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object // eslint-disable-line
};

export default MapType;
