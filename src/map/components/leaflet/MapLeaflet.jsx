import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, ZoomControl, ScaleControl, Polygon, Marker } from 'react-leaflet';

import CustomMarker from './custom/marker/CustomMarker';
import ClusterGroup from './custom/cluster-group/ClusterGroup';
import NonTiledLayer from './custom/non-tiled-layer';
import RdGeoJson from './custom/geo-json';
import icons from './services/icons.constant';
import createClusterIcon from './services/cluster-icon';

const visibleToOpacity = ((isVisible) => (isVisible ? 100 : 0));

class MapLeaflet extends React.Component {
  constructor() {
    super();
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClusterGroupBounds = this.onClusterGroupBounds.bind(this);
    this.state = {
      drawMode: false
    };

    this.setMapElement = (element) => {
      if (element && element.leafletElement) {
        this.MapElement = element.leafletElement;
        this.props.getLeafletInstance(this.MapElement);
        this.onMapDraw(this.MapElement);
      }
    };

    this.setActiveElement = (element) => {
      if (element) {
        this.activeElement = element.leafletElement;
        this.fitActiveElement();
      }
    };
  }

  onMapDraw(mapElement) {
    mapElement.on('draw:drawstop', () => {
      setTimeout(() => {
        this.setState({ drawMode: false });
      });
    });
    mapElement.on('draw:drawstart', () => {
      setTimeout(() => {
        this.setState({ drawMode: true });
      });
    });
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
    if (!this.state.drawMode) {
      this.props.onClick({
        latlng,
        containerPoint,
        layerPoint
      });
    }
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

  onClusterGroupBounds(bounds) {
    this.fitBoundsInsideMap(bounds);
  }

  fitActiveElement() {
    if (!this.activeElement) {
      return;
    }
    const elementBounds = this.activeElement.getBounds();
    if (Object.keys(elementBounds).length === 0 && elementBounds.constructor === Object) {
      return;
    }
    this.fitBoundsInsideMap(elementBounds);
  }

  fitBoundsInsideMap(bounds) {
    const mapBounds = this.MapElement.getBounds();
    const elementFits = mapBounds.contains(bounds);
    if (!elementFits) {
      const elementZoom = this.MapElement.getBoundsZoom(bounds);
      if (elementZoom < this.props.zoom) {
        // pan and zoom to the geoJson element
        this.MapElement.fitBounds(bounds);
      } else {
        // only pan to the geoJson element
        this.MapElement.panInsideBounds(bounds);
      }
    }
  }

  invalidateSize() {
    this.MapElement.invalidateSize();
  }

  render() {
    const {
      center,
      clusterMarkers,
      baseLayer,
      drawShape,
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
        onDraw={this.draw}
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
          clusterMarkers.length > 0 && (
            <ClusterGroup
              showCoverageOnHover={false}
              iconCreateFunction={createClusterIcon}
              spiderfyOnMaxZoom={false}
              animate={false}
              maxClusterRadius={50}
              chunkedLoading
              getMarkerGroupBounds={this.onClusterGroupBounds}
              ref={this.setActiveElement}
              disableClusteringAtZoom={baseLayer.baseLayerOptions.maxZoom}
            >
              {
                clusterMarkers.map((marker) => (
                  <Marker
                    position={marker.position}
                    key={marker.index}
                    icon={icons[marker.type]}
                  />
                ))
              }
            </ClusterGroup>
          )
        }
        {
          markers.map((marker) => (
            <CustomMarker
              position={marker.position}
              key={marker.position.toString() + marker.type}
              icon={icons[marker.type]}
              zIndexOffset={100}
              rotationAngle={marker.heading || 0}
            />
          ))
        }
        {
          geoJson.geometry && (
            <RdGeoJson
              ref={this.setActiveElement}
              key={geoJson.label}
              data={geoJson}
            />
          )
        }
        {
          drawShape.latLngList && (
            <Polygon
              positions={drawShape.latLngList}
              ref={this.setActiveElement}
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
  drawShape: {},
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
  drawShape: PropTypes.shape({}),
  geoJson: PropTypes.shape({}),
  getLeafletInstance: PropTypes.func.isRequired,
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
