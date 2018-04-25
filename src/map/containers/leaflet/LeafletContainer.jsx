import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapLeaflet from '../../components/leaflet/MapLeaflet';
import MAP_CONFIG from '../../services/map-config';
import { updateZoom, updatePan, getMarkers } from '../../ducks/map/map';
import { updateClick } from '../../ducks/click-location/map-click-location';
import { getUrlTemplate } from '../../ducks/base-layers/map-base-layers';
import { getLayers } from '../../ducks/layers/map-layers';
import { getPolygons } from '../../ducks/detail/map-detail';

const baseLayerOptions = MAP_CONFIG.BASE_LAYER_OPTIONS;
const mapOptions = MAP_CONFIG.MAP_OPTIONS;
const scaleControlOptions = MAP_CONFIG.SCALE_OPTIONS;


const mapStateToProps = (state) => ({
  baseLayer: {
    urlTemplate: getUrlTemplate(state),
    baseLayerOptions
  },
  layers: getLayers(state),
  center: state.map.viewCenter,
  markers: getMarkers(state),
  geometry: getPolygons(state),
  zoom: state.map.zoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onUpdateZoom: updateZoom,
  onUpdatePan: updatePan,
  onUpdateClick: updateClick
}, dispatch);

const LeafletContainer = ({
  baseLayer,
  center,
  layers,
  markers,
  geometry,
  onUpdateClick,
  onUpdatePan,
  onUpdateZoom,
  zoom
}) => (
  <div>
    { baseLayer.urlTemplate.length && (
      <MapLeaflet
        layers={layers}
        mapOptions={mapOptions}
        markers={markers}
        scaleControlOptions={scaleControlOptions}
        baseLayer={baseLayer}
        center={center}
        zoom={zoom}
        geometry={geometry}
        onZoomEnd={onUpdateZoom}
        onDragEnd={onUpdatePan}
        onClick={onUpdateClick}
      />
    )}
  </div>
);

LeafletContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

LeafletContainer.defaultProps = {
  baseLayer: {
    urlTemplate: ''
  },
  center: [],
  geometry: [],
  layers: [],
  markers: []
};

LeafletContainer.propTypes = {
  baseLayer: PropTypes.shape({
    urlTemplate: PropTypes.string,
    baseLayerOptions: PropTypes.shape({})
  }),
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    overlayOptions: PropTypes.shape({}),
    transparent: PropTypes.bool,
    url: PropTypes.string.isRequired
  })),
  center: PropTypes.arrayOf(PropTypes.number),
  geometry: PropTypes.array, //eslint-disable-line
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  zoom: PropTypes.number.isRequired,
  onUpdateZoom: PropTypes.func.isRequired,
  onUpdatePan: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletContainer);
