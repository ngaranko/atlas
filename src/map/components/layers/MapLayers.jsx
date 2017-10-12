import React from 'react';
import PropTypes from 'prop-types';

import MapLegend from '../legend/MapLegend';
import AddIcon from '../../../../public/images/icon-plus.svg';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

const checkAccess = (layers, scopes) => (
  layers.filter(layer => !layer.authScope || (scopes.length && scopes.includes(layer.authScope)))
);

const MapLayers = ({ activeMapLayers, layers, onLayerToggle, user }) => (
  <ul className="map-layers">
    {[...new Set(checkAccess(layers, user.scopes).map(layer => layer.category))].map(category => (
      <li className="map-layers__category" key={category}>
        {category}
        <ul>
          {layers.filter(layer => layer.category === category).map(layer => (
            <li
              className={`
                map-layers__title
                map-layers__title--${activeMapLayers.some(mapLayer => layer.title === mapLayer.title) ? 'active' : 'inactive'}
              `}
              key={layer.title}
            >
              <button onClick={() => {
                MapLegend.mapLayersLegendItemsToIds(layer).forEach(mapLayerId =>
                  onLayerToggle(mapLayerId));
              }}
              >
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
  activeMapLayers: PropTypes.array, // eslint-disable-line
  layers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func.isRequired,
  user: PropTypes.object // eslint-disable-line
};

export default MapLayers;
