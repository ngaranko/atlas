import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../../shared/components/select';

import AerialIcon from '../../../../public/images/icon-aerial.svg';
import TopographyIcon from '../../../../public/images/icon-topography.svg';

function hasLayer(activeLayer, layers) {
  return layers && layers.length > 0 && layers.some(l => l.value === activeLayer);
}

const MapType = ({ layers, activeLayer, onBaseLayerToggle }) => (
  <section className="map-panel__map-type">
    <Select
      className="map-panel__map-type-select map-panel__map-type-select--topography"
      name="topography"
      icon={TopographyIcon}
      options={layers.topography}
      value={activeLayer}
      disabled={!hasLayer(activeLayer, layers.topography)}
      handleChange={onBaseLayerToggle}
    />

    <Select
      className="map-panel__map-type-select map-panel__map-type-select--aerial"
      name="aerial"
      icon={AerialIcon}
      options={layers.aerial}
      value={activeLayer}
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
