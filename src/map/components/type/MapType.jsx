import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

function hasLayer(activeLayer, layers) {
  return layers && layers.length > 0 && layers.some(l => l.value === activeLayer);
}

const MapType = ({ layers, activeLayer, onBaseLayerToggle }) => (
  <section className="map-panel__map-type">
    <Select
      className="map-panel__map-type-select map-panel__map-type-select--topography"
      name="topography"
      options={layers.topography}
      value={hasLayer(activeLayer, layers.topography) ? activeLayer : ''}
      disabled={!hasLayer(activeLayer, layers.topography)}
      handleChange={onBaseLayerToggle}
    />

    <Select
      className="map-panel__map-type-select map-panel__map-type-select--aerial"
      name="aerial"
      options={layers.aerial}
      value={hasLayer(activeLayer, layers.aerial) ? activeLayer : ''}
      disabled={!hasLayer(activeLayer, layers.aerial)}
      handleChange={onBaseLayerToggle}
    />
  </section>
);

MapType.propTypes = {
  layers: PropTypes.object, // eslint-disable-line
  activeLayer: PropTypes.string, // eslint-disable-line
  onBaseLayerToggle: PropTypes.func // eslint-disable-line
};

export default MapType;
