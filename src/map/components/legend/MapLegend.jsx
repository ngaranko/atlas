import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../shared/components/checkbox';

const MapLegend = ({ activeMapLayers }) => (
  <ul className="map-legend">
    {activeMapLayers.map(mapLayer => (
      <li key={mapLayer.id}>
        <div className="map-legend__category">
          <Checkbox
            checked="true"
            name={mapLayer.id}
          />
          <span>{mapLayer.title}</span>
        </div>
        <ul className="map-legend__items">
          {/* TODO: Remove `.filter()` as soon data is complete */}
          {mapLayer.legendItems.filter(legendItem => !!legendItem.title).map(legendItem => (
            <li
              className="map-legend__item"
              key={legendItem.id}
            >
              <Checkbox
                checked="true"
                name={legendItem.id}
              />
              <div className="map-legend__image">
                <img
                  alt=""
                  src={legendItem.imageUrl}
                />
              </div>
              <span>{legendItem.title}</span>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

MapLegend.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
};

export default MapLegend;
