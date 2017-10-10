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

const MapType = ({ layers, onBaseLayerToggle }) => (
  <section className="map-panel__map-type">
    <Select
      className="map-panel__map-type-select map-panel__map-type-select--topography"
      name="topography"
      options={layers.topography}
      handleChange={handleChange}
    />

    <Select
      className="map-panel__map-type-select map-panel__map-type-select--aerial"
      name="aerial"
      options={layers.aerial}
      disabled={true}
      handleChange={handleChange}
    />
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object, // eslint-disable-line
  onBaseLayerToggle: PropTypes.func // eslint-disable-line
};

export default MapType;
