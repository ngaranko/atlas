import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../shared/components/checkbox';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

import './_map-legend.scss';

class MapLegend extends React.Component {
  static constructLegendIconUrl(mapLayer, legendItem) {
    if (legendItem.iconUrl) {
      return legendItem.iconUrl;
    }
    return [
      '//',
      process.env.NODE_ENV !== 'production' ? 'acc.map.data.amsterdam.nl' : 'map.data.amsterdam.nl',
      `${mapLayer.url}&`,
      'request=GetLegendGraphic&',
      'sld_version=1.1.0&',
      `layer=${legendItem.layer || mapLayer.layers[0]}&`,
      'format=image/svg%2Bxml&',
      `rule=${encodeURIComponent(legendItem.title)}`
    ].join('');
  }

  static mapLayersLegendItemsToIds(mapLayer) {
    return [
      mapLayer.id,
      ...mapLayer.legendItems.map((legendItem) => legendItem.id)
    ].filter((mapLayerId) => !!mapLayerId);
  }

  determineLayerVisibility(mapLayer) {
    return this.props.overlays.some((overlay) => [
      { id: mapLayer.id },
      ...mapLayer.legendItems
    ].some((legendItem) => overlay.id === legendItem.id && overlay.isVisible));
  }

  determineLegendItemVisibility(legendItem) {
    return this.props.overlays.some((overlay) => overlay.id === legendItem.id && overlay.isVisible);
  }

  toggleLayer(mapLayer) {
    MapLegend.mapLayersLegendItemsToIds(mapLayer).forEach((mapLayerId) =>
      this.props.onLayerToggle(mapLayerId));
  }

  toggleLayerVisibility(mapLayer) {
    const isVisible = this.determineLayerVisibility(mapLayer);
    MapLegend.mapLayersLegendItemsToIds(mapLayer).forEach((mapLayerId) =>
      this.props.onLayerVisibilityToggle(mapLayerId, !isVisible));
  }

  render() {
    const { activeMapLayers, onLayerVisibilityToggle, zoomLevel } = this.props;

    return (
      <div>
        <h3 className="u-sr-only">Actieve kaartlagen</h3>
        <ul className="map-legend">
          {activeMapLayers.map((mapLayer) => (
            <li
              className={`
                map-legend__map-layer
                map-legend__map-layer--${this.determineLayerVisibility(mapLayer) ? 'visible' : 'hidden'}
              `}
              key={mapLayer.title}
            >
              <div
                className={`
                  map-legend__category
                  map-legend__category--${mapLayer.legendItems.some((legendItem) => legendItem.selectable) ? '' : 'un'}selectable-legend
                `}
              >
                <Checkbox
                  checked={() => this.determineLayerVisibility(mapLayer)}
                  name={mapLayer.title}
                  onChange={() => this.toggleLayerVisibility(mapLayer)}
                />
                <h4 className="map-legend__category-title">{mapLayer.title}</h4>
                <button
                  className="map-legend__toggle map-legend__toggle--remove"
                  onClick={() => this.toggleLayer(mapLayer)}
                >
                  <RemoveIcon />
                </button>
              </div>
              {(zoomLevel < mapLayer.minZoom || zoomLevel > mapLayer.maxZoom) && (
                <div className="map-legend__zoom-level-notification">
                  <span>Zichtbaar bij verder {zoomLevel < mapLayer.minZoom ? 'inzoomen' : 'uitzoomen'}</span>
                </div>
              )}
              {(zoomLevel >= mapLayer.minZoom && zoomLevel <= mapLayer.maxZoom) && (
                <ul className="map-legend__items">
                  {mapLayer.legendItems.map((legendItem) => (
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
                      <div className={`
                        map-legend__image
                        map-legend__image--${legendItem.selectable ? 'selectable' : 'not-selectable'}
                      `}
                      >
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
      </div>
    );
  }
}

MapLegend.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func, // eslint-disable-line
  onLayerVisibilityToggle: PropTypes.func, // eslint-disable-line
  overlays: PropTypes.array, // eslint-disable-line
  zoomLevel: PropTypes.number.isRequired
};

export default MapLegend;
