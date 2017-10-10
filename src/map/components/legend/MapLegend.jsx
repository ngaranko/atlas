import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../shared/components/checkbox';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

const MapLegend = ({ activeMapLayers, onLayerToggle, onLayerVisibilityToggle, zoomLevel }) => (
  <ul className="map-legend">
    {activeMapLayers.map(mapLayer => (
      <li key={mapLayer.id}>
        <div className="map-legend__category">
          <Checkbox
            checked="true"
            name={mapLayer.id}
            onChange={() => onLayerVisibilityToggle(mapLayer.id)}
          />
          <span className="map-legend__category-title">{mapLayer.title}</span>
          <button onClick={() => onLayerToggle(mapLayer.id)}>
            <span className="map-legend__toggle map-legend__toggle--remove">
              <RemoveIcon />
            </span>
          </button>
        </div>
        {(zoomLevel < mapLayer.minZoom || zoomLevel > mapLayer.maxZoom) && (
          <div className="map-legend__zoom-level-notification">
            <span>Zichtbaar bij verder {zoomLevel < mapLayer.minZoom ? 'inzoomen' : 'uitzoomen'}</span>
          </div>
        )}
        {(zoomLevel >= mapLayer.minZoom && zoomLevel <= mapLayer.maxZoom) && (
          <ul className="map-legend__items">
            {/* TODO: Remove `.filter()` as soon data is complete */}
            {mapLayer.legendItems.filter(legendItem => !!legendItem.title).map(legendItem => (
              <li
                className="map-legend__item"
                key={legendItem.title}
              >
                {legendItem.selectable && (
                  <Checkbox
                    checked="true"
                    name={legendItem.title}
                  />
                )}
                <div className="map-legend__image">
                  <img
                    alt=""
                    src={[
                      `https://acc.map.data.amsterdam.nl${mapLayer.url}&`,
                      'request=GetLegendGraphic&',
                      'sld_version=1.1.0&',
                      `layer=${legendItem.layer || mapLayer.layers[0]}&`,
                      'format=image/svg%2Bxml&',
                      `rule=${encodeURIComponent(legendItem.title)}`
                    ].join('')}
                  />
                </div>
                <span className="map-legend__title">{legendItem.title}</span>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

MapLegend.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func, // eslint-disable-line
  onLayerVisibilityToggle: PropTypes.func, // eslint-disable-line
  zoomLevel: PropTypes.number.isRequired
};

export default MapLegend;
