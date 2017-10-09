import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

function handleChange(e, value) {
  if (value.indexOf('topo_') !== -1) {
    console.log('make topography active and aerial inactive');
  } else {
    console.log('make topography inactive and aerial active');
  }
}

const MapType = ({ layers }) => (
  <section className="map-panel__map-type">
    <Select
      className="map-panel__map-type-select map-panel__map-type-select--topography"
      name="topography"
      options={layers.topography}
      value="topo_rd"
      label="Topografie"
      handleChange={handleChange}
    />

    <Select
      className="map-panel__map-type-select map-panel__map-type-select--aerial"
      name="aerial"
      options={layers.aerial}
      disabled={true}
      value="lf2017"
      label="Luchtfoto 2017"
      handleChange={handleChange}
    />
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object // eslint-disable-line
};

export default MapType;
