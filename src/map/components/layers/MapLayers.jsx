import React from 'react';
import PropTypes from 'prop-types';

const MapLayers = ({ layers, onLayerToggle, overlays }) => (
  <ul>
    {[...new Set(layers.map(layer => layer.category))].map(category => (
      <li className="map-panel__layer-category" key={category}>
        {category}
        <ul>
          {layers.filter(layer => layer.category === category).map(layer => (
            <li
              className={`
                map-panel__layer-title
                map-panel__layer-title--${overlays.some(overlay => layer.id === overlay.id) ? 'active' : 'inactive'}
              `}
              key={layer.title}
            >
              <button onClick={() => onLayerToggle(layer.id)}>
                <span>
                  {layer.title}
                </span>
                <span className="map-panel__layer-toggle map-panel__layer-toggle--remove">
                  Remove
                </span>
                <span className="map-panel__layer-toggle map-panel__layer-toggle--add">
                  Add
                </span>
              </button>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

MapLayers.propTypes = {
  layers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func.isRequired,
  overlays: PropTypes.array // eslint-disable-line
};

export default MapLayers;
