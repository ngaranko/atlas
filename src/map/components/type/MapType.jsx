import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

const MapType = ({ layers, onBaseLayerToggle }) => (
  <section className="map-panel__map-type">
    <Select
      className="map-panel__map-type-select map-panel__map-type-select--topography"
      name="topography"
      options={layers.topography}
      handleChange={onBaseLayerToggle}
    />

    <Select
      className="map-panel__map-type-select map-panel__map-type-select--aerial"
      name="aerial"
      options={layers.aerial}
      disabled={true}
      handleChange={onBaseLayerToggle}
    />
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object, // eslint-disable-line
  onBaseLayerToggle: PropTypes.func // eslint-disable-line
};

export default MapType;
