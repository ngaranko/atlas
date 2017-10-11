import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../shared/components/checkbox';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

class MapLegend extends React.Component {
  static constructLegendIconUrl(mapLayer, legendItem) {
    return [
      `https://acc.map.data.amsterdam.nl${mapLayer.url}&`,
      'request=GetLegendGraphic&',
      'sld_version=1.1.0&',
      `layer=${legendItem.layer || mapLayer.layers[0]}&`,
      'format=image/svg%2Bxml&',
      `rule=${encodeURIComponent(legendItem.title)}`
    ].join('');
  }

  determineLayerVisibility(mapLayer) {
    return this.props.overlays.some(overlay => [
      { id: mapLayer.id },
      ...mapLayer.legendItems
    ].some(legendItem => overlay.id === legendItem.id && overlay.isVisible));
  }

  determineLegendItemVisibility(legendItem) {
    return this.props.overlays.some(overlay => overlay.id === legendItem.id && overlay.isVisible);
  }

  toggleLayer(mapLayer) {
    const layers = [
      mapLayer.id,
      ...mapLayer.legendItems.map(legendItem => legendItem.id)
    ];
    layers
      .filter(mapLayerId => !!mapLayerId)
      .forEach(mapLayerId => this.props.onLayerToggle(mapLayerId));
  }

  toggleLayerVisibility(mapLayer) {
    const layers = [
      mapLayer.id,
      ...mapLayer.legendItems.map(legendItem => legendItem.id)
    ];
    layers
      .filter(mapLayerId => !!mapLayerId)
      .forEach(mapLayerId => this.props.onLayerVisibilityToggle(mapLayerId));
  }

  render() {
    const { activeMapLayers, onLayerVisibilityToggle, zoomLevel } = this.props;

    return (
      <ul className="map-legend">
        {activeMapLayers.map(mapLayer => (
          <li key={mapLayer.title}>
            <div className="map-legend__category">
              <Checkbox
                checked={() => this.determineLayerVisibility(mapLayer)}
                name={mapLayer.title}
                onChange={() => this.toggleLayerVisibility(mapLayer)}
              />
              <span className="map-legend__category-title">{mapLayer.title}</span>
              <button onClick={() => this.toggleLayer(mapLayer)}>
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
                        checked={() => this.determineLegendItemVisibility(legendItem)}
                        name={legendItem.title}
                        onChange={() => onLayerVisibilityToggle(legendItem.id)}
                      />
                    )}
                    <div className="map-legend__image">
                      <img
                        alt=""
                        src={MapLegend.constructLegendIconUrl(mapLayer, legendItem)}
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
  }
}

MapLegend.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func, // eslint-disable-line
  onLayersToggle: PropTypes.func, // eslint-disable-line
  onLayerVisibilityToggle: PropTypes.func, // eslint-disable-line
  overlays: PropTypes.array, // eslint-disable-line
  zoomLevel: PropTypes.number.isRequired
};

export default MapLegend;
