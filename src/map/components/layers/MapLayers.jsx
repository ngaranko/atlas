import React from 'react';
import PropTypes from 'prop-types';

const MapLayers = ({ layers, onLayerToggle }) => (
  <ul>
    {[...new Set(layers.map(layer => layer.category))].map(category => (
      <li className="map-panel__layer-category" key={category}>
        {category}
        <ul>
          {layers.filter(layer => layer.category === category).map(layer => (
            <li
              className="map-panel__layer-title"
              key={layer.title}
            >
              <button onClick={() => onLayerToggle(layer.id)}>{layer.title}</button>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

MapLayers.propTypes = {
  layers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func.isRequired
};

export default MapLayers;
