import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, ScaleControl, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import CustomMarker from './custom/marker/CustomMarker';
import NonTiledLayer from './custom/non-tiled-layer';
import RdGeoJson from './custom/geo-json';
import getIconByType from './services/get-icon-by-type';

const visibleToOpacity = ((isVisible) => (isVisible ? 100 : 0));

const createClusterCustomIcon = (cluster) => (
  L.divIcon({
    html: `
        <div aria-label="Cluster met ${cluster.getChildCount()} onderdelen">
          ${cluster.getChildCount()}
        </div>
    `,
    className: 'leaflet-marker-icon o-highlight-cluster',
    iconSize: L.point(40, 40, true)
  }));

class MapLeaflet extends React.Component {
  constructor() {
    super();
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.setMapElement = (element) => {
      this.MapElement = element;
    };

    this.setGeoJsonElement = (element) => {
      if (element) {
        this.geoJsonElement = element;
        this.fitGeoJson();
      }
    };
  }

  onZoomEnd(event) {
    this.props.onZoomEnd({
      zoom: event.target.getZoom(),
      maxZoom: event.target.getMaxZoom(),
      minZoom: event.target.getMinZoom(),
      center: event.target.getCenter()
    });
  }

  onClick(event) {
    const { latlng, containerPoint, layerPoint } = event;
    this.props.onClick({
      latlng,
      containerPoint,
      layerPoint
    });
  }

  onMoveEnd(event) {
    this.props.onMoveEnd({
      center: event.target.getCenter()
    });
  }

  onDragEnd(event) {
    this.props.onDragEnd({
      center: event.target.getCenter()
    });
  }

  fitGeoJson() {
    if (!this.geoJsonElement) {
      return;
    }
    const elementBounds = this.geoJsonElement.leafletElement.getBounds();
    const mapBounds = this.MapElement.leafletElement.getBounds();
    const elementFits = mapBounds.contains(elementBounds);
    if (!elementFits) {
      const elementZoom = this.MapElement.leafletElement.getBoundsZoom(elementBounds);
      if (elementZoom < this.props.zoom) {
        // pan and zoom to the geoJson element
        this.MapElement.leafletElement.fitBounds(elementBounds);
      } else {
        // only pan to the geoJson element
        this.MapElement.leafletElement.panInsideBounds(elementBounds);
      }
    }
  }

  invalidateSize() {
    this.MapElement.leafletElement.invalidateSize();
  }

  render() {
    const {
      center,
      clusterMarkers,
      baseLayer,
      geoJson,
      layers,
      mapOptions,
      markers,
      scaleControlOptions,
      zoom
    } = this.props;
    return (
      <Map
        ref={this.setMapElement}
        onZoomEnd={this.onZoomEnd}
        onClick={this.onClick}
        onMoveEnd={this.onMoveEnd}
        onDragEnd={this.onDragEnd}
        center={center}
        zoom={zoom}
        {...mapOptions}
      >
        <TileLayer
          {...baseLayer.baseLayerOptions}
          url={baseLayer.urlTemplate}
        />
        {
          layers.map((layer) => (
            <NonTiledLayer
              key={layer.id}
              {...layer.overlayOptions}
              url={layer.url}
              opacity={visibleToOpacity(layer.isVisible)}
            />
          ))
        }
        {
          <MarkerClusterGroup
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
            spiderfyOnMaxZoom={false}
            animate={false}
          >
            {
              clusterMarkers.map((marker) => (
                <Marker
                  position={marker.position}
                  key={marker.position.toString() + marker.type + Math.random().toString()}
                  icon={getIconByType(marker.type)}
                />
              ))
            }
          </MarkerClusterGroup>
        }
        {
          markers.map((marker) => (
            <CustomMarker
              position={marker.position}
              key={marker.position.toString() + marker.type}
              icon={getIconByType(marker.type)}
              rotationAngle={marker.heading || 0}
            />
          ))
        }
        {
          geoJson.geometry && (
            <RdGeoJson
              ref={this.setGeoJsonElement}
              key={geoJson.label}
              data={geoJson}
            />
          )
        }
        <ScaleControl {...scaleControlOptions} />
        {
          this.props.isZoomControlVisible && (
            <ZoomControl position="bottomright" />
          )
        }
      </Map>
    );
  }
}

MapLeaflet.defaultProps = {
  baseLayer: {
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
    baseLayerOptions: {}
  },
  center: [52.3731081, 4.8932945],
  clusterMarkers: [],
  geoJson: {},
  layers: [],
  mapOptions: {},
  markers: [],
  scaleControlOptions: {},
  zoom: 11,
  isZoomControlVisible: true,
  onClick: () => 'click',
  onDoubleClick: () => 'doubleclick',
  onDragEnd: () => 'dragend',
  onMoveEnd: () => 'moveend',
  onZoomEnd: () => 'zoomend'
};

MapLeaflet.propTypes = {
  baseLayer: PropTypes.shape({
    urlTemplate: PropTypes.string,
    baseLayerOptions: PropTypes.shape({})
  }),
  center: PropTypes.arrayOf(PropTypes.number),
  clusterMarkers: PropTypes.arrayOf(PropTypes.shape({})),
  geoJson: PropTypes.shape({}),
  isZoomControlVisible: PropTypes.bool,
  mapOptions: PropTypes.shape({}),
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    overlayOptions: PropTypes.shape({}),
    transparent: PropTypes.bool,
    url: PropTypes.string.isRequired
  })),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onZoomEnd: PropTypes.func,
  scaleControlOptions: PropTypes.shape({}),
  zoom: PropTypes.number
};

export default MapLeaflet;
