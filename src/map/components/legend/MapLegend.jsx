import React from 'react';
import PropTypes from 'prop-types';

const MapLegend = ({ activeMapLayers }) => (
  <ul className="map-legend">
    {activeMapLayers.map(mapLayer => (
      <li key={mapLayer.id}>
        <div className="map-legend__category">
          <input className="checkbox" type="checkbox" />
          <span>{mapLayer.title}</span>
        </div>
        <ul className="map-legend__items">
          {/* TODO: Remove `.filter()` as soon data is complete */}
          {mapLayer.legendItems.filter(legendItem => !!legendItem.title).map(legendItem => (
            <li
              className="map-legend__item"
              key={legendItem.id}
            >
              <input className="checkbox" type="checkbox" />
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
