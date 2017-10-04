import React from 'react';
import PropTypes from 'prop-types';

import AddIcon from '../../../../public/images/icon-plus.svg';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

const MapLayers = ({ layers, onLayerToggle, overlays }) => (
  <ul className="map-layers">
    {[...new Set(layers.map(layer => layer.category))].map(category => (
      <li className="map-layers__category" key={category}>
        {category}
        <ul>
          {layers.filter(layer => layer.category === category).map(layer => (
            <li
              className={`
                map-layers__title
                map-layers__title--${overlays.some(overlay => layer.id === overlay.id) ? 'active' : 'inactive'}
              `}
              key={layer.title}
            >
              <button onClick={() => onLayerToggle(layer.id)}>
                <span>
                  {layer.title}
                </span>
                <span className="map-layers__toggle map-layers__toggle--remove">
                  <RemoveIcon />
                </span>
                <span className="map-layers__toggle map-layers__toggle--add">
                  <AddIcon />
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
