import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapLeaflet from '../../components/leaflet/MapLeaflet';
import MAP_CONFIG from '../../services/map-config';
import { updateZoom, updatePan } from '../../ducks/map/map';
import { getUrlTemplate } from '../../ducks/base-layers/map-base-layers';
import { getLayers } from '../../ducks/layers/map-layers';

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
    { baseLayer.urlTemplate.length && (
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
    )}
  </div>
);

LeafletContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

LeafletContainer.defaultProps = {
  layers: [],
  center: [],
  baseLayer: {
    urlTemplate: ''
  }
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
  zoom: PropTypes.number.isRequired,
  onUpdateZoom: PropTypes.func.isRequired,
  onUpdatePan: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletContainer);
