import React from 'react';
import PropTypes from 'prop-types';

import MapLegend from '../legend/MapLegend';
import AddIcon from '../../../../public/images/icon-plus.svg';
import RemoveIcon from '../../../../public/images/icon-cross.svg';
import CollapseIcon from '../../../../public/images/icon-arrow-down.svg';
import ExpandIcon from '../../../../public/images/icon-arrow-up.svg';

const showLayer = (layer, user) => (
  !layer.authScope || (user.authenticated && user.scopes.includes(layer.authScope))
);

const showCategory = (layers, user) => (
  layers.filter((layer) => layer.category && showLayer(layer, user))
);

const MapLayers = (props) => (
  <div className="map-layers">
    <button
      className="map-layers__handle"
      onClick={props.onMapLayersToggle}
    >
      {props.isMapLayersVisible ?
        <CollapseIcon /> :
        <ExpandIcon />
      }
    </button>
    {props.isMapLayersVisible && (
      <ul>
        {[...new Set(showCategory(props.layers, props.user).map((layer) => layer.category))]
          .map((category) => (
            <li className="map-layers__category" key={category}>
              {category}
              <ul>
                {props.layers
                  .filter((layer) => layer.category === category && showLayer(layer, props.user))
                  .map((layer) => (
                    <li
                      className={`
                        map-layers__title
                        map-layers__title--${props.activeMapLayers.some((mapLayer) => layer.title === mapLayer.title) ? 'active' : 'inactive'}
                      `}
                      key={layer.title}
                    >
                      <button onClick={() => {
                        MapLegend.mapLayersLegendItemsToIds(layer).forEach((mapLayerId) =>
                          props.onLayerToggle(mapLayerId));
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
    )}
  </div>
);

MapLayers.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  isMapLayersVisible: PropTypes.bool.isRequired,
  layers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  onMapLayersToggle: PropTypes.func.isRequired,
  user: PropTypes.object // eslint-disable-line
};

export default MapLayers;
