import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../shared/components/checkbox';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

const MapLegend = ({ activeMapLayers, onLayerToggle }) => (
  <ul className="map-legend">
    {activeMapLayers.map(mapLayer => (
      <li key={mapLayer.id}>
        <div className="map-legend__category">
          <Checkbox
            checked="true"
            name={mapLayer.id}
            onChange={() => onLayerToggle(mapLayer.id)}
          />
          <span className="map-legend__category-title">{mapLayer.title}</span>
          <button onClick={() => onLayerToggle(mapLayer.id)}>
            <span className="map-legend__toggle map-legend__toggle--remove">
              <RemoveIcon />
            </span>
          </button>
        </div>
        <ul className="map-legend__items">
          {/* TODO: Remove `.filter()` as soon data is complete */}
          {mapLayer.legendItems.filter(legendItem => !!legendItem.title).map(legendItem => (
            <li
              className="map-legend__item"
              key={legendItem.id}
            >
              {legendItem.selectable && (
                <Checkbox
                  checked="true"
                  name={legendItem.id}
                />
              )}
              <div className="map-legend__image">
                {/* TODO: Remove condition as soon as data is complete */}
                {legendItem.imageUrl && (
                  <img
                    alt=""
                    src={legendItem.imageUrl}
                  />
                )}
              </div>
              <span className="map-legend__title">{legendItem.title}</span>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

MapLegend.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func // eslint-disable-line
};

export default MapLegend;
