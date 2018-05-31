import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapLeaflet from '../../components/leaflet/MapLeaflet';
import MAP_CONFIG from '../../services/map-config';
import { updateZoom, updatePan, getMarkers, getCenter } from '../../ducks/map/map';
import { updateClick } from '../../ducks/click-location/map-click-location';
import { fetchMapBaseLayers, getUrlTemplate } from '../../ducks/base-layers/map-base-layers';
import { fetchMapLayers, getLayers } from '../../ducks/layers/map-layers';
import { getGeoJson } from '../../ducks/detail/map-detail';
import { getClusterMarkers, getDrawShape } from '../../ducks/data-selection/data-selection';
import { fetchPanelLayers } from '../../ducks/panel-layers/map-panel-layers';

const baseLayerOptions = MAP_CONFIG.BASE_LAYER_OPTIONS;
const mapOptions = MAP_CONFIG.MAP_OPTIONS;
const scaleControlOptions = MAP_CONFIG.SCALE_OPTIONS;


const mapStateToProps = (state) => ({
  baseLayer: {
    urlTemplate: getUrlTemplate(state),
    baseLayerOptions
  },
  center: getCenter(state),
  clusterMarkers: getClusterMarkers(state),
  geoJson: getGeoJson(state),
  markers: getMarkers(state),
  layers: getLayers(state),
  drawShape: getDrawShape(state),
  drawingMode: state.map.drawingMode,
  uiState: Object.keys(state.ui).map((key) => (
     state.ui[key]
   )).toString(),
  zoom: state.map.zoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onUpdateZoom: updateZoom,
  onUpdatePan: updatePan,
  onUpdateClick: updateClick
}, dispatch);

class LeafletContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uiState: ''
    };
    this.setMapLeaflet = (element) => {
      this.MapLeaflet = element;
      this.updateMapBounds();
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.handlePan = this.handlePan.bind(this);
  }

  componentDidMount() {
    // if the baseLayer.urlTemplate is set it means there are mapLayers
    // this way actions won't be dispatched if the mapLayers are already in the state
    if (!this.props.baseLayer.urlTemplate) {
      this.context.store.dispatch(fetchMapBaseLayers());
      this.context.store.dispatch(fetchMapLayers());
      this.context.store.dispatch(fetchPanelLayers());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { uiState } = nextProps;
    if (uiState !== this.state.uiState) {
      this.updateMapBounds();
      this.setState({ uiState });
    }
  }

  handleZoom(event) {
    this.props.onUpdateZoom(event, this.props.drawingMode);
  }

  handlePan(event) {
    this.props.onUpdatePan(event, this.props.drawingMode);
  }

  updateMapBounds() {
    setTimeout(() => {
      if (this.MapLeaflet) {
        this.MapLeaflet.invalidateSize();
        this.MapLeaflet.fitActiveElement();
      }
    });
  }

  render() {
    const {
      baseLayer,
      center,
      clusterMarkers,
      drawShape,
      geoJson,
      getLeafletInstance,
      layers,
      markers,
      onUpdateClick,
      zoom
    } = this.props;
    return baseLayer.urlTemplate && (
      <MapLeaflet
        getLeafletInstance={getLeafletInstance}
        baseLayer={baseLayer}
        center={center}
        clusterMarkers={clusterMarkers}
        drawShape={drawShape}
        geoJson={geoJson}
        layers={layers}
        mapOptions={mapOptions}
        markers={markers}
        onClick={onUpdateClick}
        onDragEnd={this.handlePan}
        onZoomEnd={this.handleZoom}
        ref={this.setMapLeaflet}
        scaleControlOptions={scaleControlOptions}
        zoom={zoom}
      />
    );
  }
}

LeafletContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

LeafletContainer.defaultProps = {
  baseLayer: {
    urlTemplate: ''
  },
  center: [],
  clusterMarkers: [],
  drawShape: {},
  geoJson: {},
  layers: [],
  markers: [],
  uiState: ''
};

LeafletContainer.propTypes = {
  baseLayer: PropTypes.shape({
    urlTemplate: PropTypes.string,
    baseLayerOptions: PropTypes.shape({})
  }),
  center: PropTypes.arrayOf(PropTypes.number),
  clusterMarkers: PropTypes.arrayOf(PropTypes.shape({})),
  drawShape: PropTypes.shape({}),
  drawingMode: PropTypes.string.isRequired,
  geoJson: PropTypes.shape({}),
  getLeafletInstance: PropTypes.func.isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    overlayOptions: PropTypes.shape({}),
    transparent: PropTypes.bool,
    url: PropTypes.string.isRequired
  })),
  onUpdateClick: PropTypes.func.isRequired,
  onUpdatePan: PropTypes.func.isRequired,
  onUpdateZoom: PropTypes.func.isRequired,
  uiState: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletContainer);
