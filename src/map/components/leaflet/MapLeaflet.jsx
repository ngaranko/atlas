import React from 'react';
import PropTypes from 'prop-types';
import ResizeAware from 'react-resize-aware';
import { Map, TileLayer, ZoomControl, ScaleControl, Marker } from 'react-leaflet';

import CustomMarker from './custom/marker/CustomMarker';
import ClusterGroup from './custom/cluster-group/ClusterGroup';
import NonTiledLayer from './custom/non-tiled-layer';
import RdGeoJson from './custom/geo-json';
import icons from './services/icons.constant';
import createClusterIcon from './services/cluster-icon';
import { boundsToString, getBounds, isValidBounds, isBoundsAPoint } from './services/bounds';

const visibleToOpacity = ((isVisible) => (isVisible ? 100 : 0));

class MapLeaflet extends React.Component {
  constructor() {
    super();
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.onClusterGroupBounds = this.onClusterGroupBounds.bind(this);
    this.state = {
      previousFitBoundsId: ''
    };

    this.setMapElement = (element) => {
      if (element && element.leafletElement) {
        this.MapElement = element.leafletElement;
        this.props.getLeafletInstance(this.MapElement);
      }
    };

    this.setActiveElement = (element) => {
      if (element) {
        this.activeElement = element.leafletElement;
        this.checkIfActiveElementNeedsUpdate(this.activeElement);
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

  onClusterGroupBounds(bounds) {
    this.fitActiveElement(bounds);
  }

  handleResize() {
    this.MapElement.invalidateSize();
    if (this.activeElement) {
      this.fitActiveElement(getBounds(this.activeElement));
    }
  }

  checkIfActiveElementNeedsUpdate(element) {
    const elementBounds = getBounds(element);
    const elementBoundsId = boundsToString(elementBounds);
    // check if the bounds are the same in that case we don't need to update
    if (elementBoundsId !== this.state.previousFitBoundsId) {
      this.fitActiveElement(elementBounds);
      this.zoomToActiveElement(elementBounds);
    }
  }

  zoomToActiveElement(bounds) {
    const { zoom } = this.props;
    // if the bounds is not valid or is a point return
    if (!isValidBounds(bounds) || isBoundsAPoint(bounds)) {
      return;
    }
    // check wat the zoomlevel will be of the bounds and devide it with some margin
    const maxZoom = Math.round(this.MapElement.getBoundsZoom(bounds) / 1.25);
    // if the elementBounds is still bigger then the current zoom level
    if (maxZoom > zoom) {
      this.setState({ previousFitBoundsId: boundsToString(bounds) });
      // zoom and pan the map to fit the bounds with a maxZoom
      this.MapElement.fitBounds(bounds, { maxZoom });
    }
  }

  fitActiveElement(bounds) {
    if (!isValidBounds(bounds)) {
      return;
    }
    const { zoom } = this.props;
    const mapBounds = this.MapElement.getBounds();
    const elementFits = mapBounds.contains(bounds);

    if (!elementFits) {
      const elementZoom = this.MapElement.getBoundsZoom(bounds);
      this.setState({ previousFitBoundsId: boundsToString(bounds) });
      if (elementZoom < zoom) {
        // pan and zoom to the geoJson element
        this.MapElement.fitBounds(bounds);
      } else {
        // only pan to the geoJson element
        this.MapElement.panInsideBounds(bounds);
      }
    }
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
      <ResizeAware
        style={{
          bottom: '0',
          left: '0',
          position: 'absolute',
          right: '0',
          top: '0'
        }}
        onlyEvent
        onResize={this.handleResize}
      >
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
                ref={this.setActiveElement}
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
          <ScaleControl {...scaleControlOptions} />
          {
            this.props.isZoomControlVisible && (
              <ZoomControl position="bottomright" />
            )
          }
        </Map>
      </ResizeAware>
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
