import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, ZoomControl, ScaleControl } from 'react-leaflet';

class LeafletMap extends React.Component {
  constructor() {
    super();
    this.handleZoomEnd = this.handleZoomEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMoveEnd = this.handleMoveEnd.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleZoomEnd(event) {
    this.props.onZoomEnd({
      zoom: event.target.getZoom(),
      maxZoom: event.target.getMaxZoom(),
      minZoom: event.target.getMinZoom()
    });
  }

  handleClick(event) {
    const { latlng, containerPoint, layerPoint } = event;
    this.props.onClick({
      latlng,
      containerPoint,
      layerPoint
    });
  }

  handleMoveEnd(event) {
    this.props.onMoveEnd({
      center: event.target.getCenter()
    });
  }

  handleDragEnd(event) {
    this.props.onDragEnd({
      center: event.target.getCenter()
    });
  }

  render() {
    const { center, zoom, baseLayer, mapOptions, scaleControlOptions } = this.props;
    return (
      <Map
        onZoomEnd={this.handleZoomEnd}
        onClick={this.handleClick}
        onMoveEnd={this.handleMoveEnd}
        onDragEnd={this.handleDragEnd}
        center={center}
        zoom={zoom}
        {...mapOptions}
      >
        <TileLayer
          {...baseLayer.baseLayerOptions}
          url={baseLayer.urlTemplate}
        />
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

LeafletMap.defaultProps = {
  center: [52.3731081, 4.8932945],
  zoom: 11,
  baseUrl: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
  mapOptions: {},
  scaleControlOptions: {},
  baseLayer: {
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
    baseLayerOptions: {}
  },
  isZoomControlVisible: true,
  onZoomEnd: () => 'zoomend',
  onClick: () => 'click',
  onDoubleClick: () => 'doubleclick',
  onMoveEnd: () => 'moveend',
  onDragEnd: () => 'dragend'
};

LeafletMap.propTypes = {
  center: PropTypes.array, //eslint-disable-line
  zoom: PropTypes.number,
  mapOptions: PropTypes.shape({}),
  scaleControlOptions: PropTypes.shape({}),
  baseLayer: PropTypes.shape({
    urlTemplate: PropTypes.string,
    baseLayerOptions: PropTypes.shape({})
  }),
  isZoomControlVisible: PropTypes.bool,
  onZoomEnd: PropTypes.func,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default LeafletMap;
