import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DrawTool from '../../containers/draw-tool/DrawToolContainer'; //eslint-disable-line
import MapLeaflet from '../../components/map-leaflet/MapLeaflet';

import MAP_CONFIG from '../../services/map-config';

import { getLayers, getBaseLayer, updateZoom, updatePan } from '../../ducks/map/map';

const baseLayerOptions = MAP_CONFIG.BASE_LAYER_OPTIONS;
const mapOptions = MAP_CONFIG.MAP_OPTIONS;
const scaleControlOptions = MAP_CONFIG.SCALE_OPTIONS;

const mapStateToProps = (state) => ({
  baseLayer: getBaseLayer(state, baseLayerOptions),
  layers: getLayers(state),
  center: state.map.viewCenter,
  zoom: state.map.zoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onUpdateZoom: updateZoom,
  onUpdatePan: updatePan
}, dispatch);

const LeafletContainer = ({
  layers,
  baseLayer,
  center,
  zoom,
  onUpdateZoom,
  onUpdatePan
}) => (
  <div>
    <MapLeaflet
      layers={layers}
      mapOptions={mapOptions}
      scaleControlOptions={scaleControlOptions}
      baseLayer={baseLayer}
      center={center}
      zoom={zoom}
      onZoomEnd={onUpdateZoom}
      onDragEnd={onUpdatePan}
    />
  </div>
);

LeafletContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

LeafletContainer.defaultProps = {
  layers: [],
  center: []
};

LeafletContainer.propTypes = {
  baseLayer: PropTypes.shape({
    urlTemplate: PropTypes.string.isRequired,
    baseLayerOptions: PropTypes.shape({}).isRequired
  }).isRequired,
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    overlayOptions: PropTypes.shape({}),
    transparent: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired
  })),
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number.isRequired,
  onUpdateZoom: PropTypes.func.isRequired,
  onUpdatePan: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletContainer);
