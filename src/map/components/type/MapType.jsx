import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

const MapType = ({ layers }) => (
  <section className="map-panel__map-type">
    <Select
      className="map-panel__map-type-select map-panel__map-type-select--topography"
      name="topography"
      options={layers.topography}
      value="topo_rd"
      label="Topografie"
    />

    <Select
      className="map-panel__map-type-select map-panel__map-type-select--aerial"
      name="aerial"
      options={layers.aerial}
      value="lf2017"
      label="Luchtfoto 2017"
    />
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object // eslint-disable-line
};

export default MapType;
