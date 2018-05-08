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
import { getGeoJson, getDrawShape } from '../../ducks/detail/map-detail';
import { getClusterMarkers } from '../../ducks/data-selection/data-selection';

const baseLayerOptions = MAP_CONFIG.BASE_LAYER_OPTIONS;
const mapOptions = MAP_CONFIG.MAP_OPTIONS;
const scaleControlOptions = MAP_CONFIG.SCALE_OPTIONS;


const mapStateToProps = (state) => ({
  baseLayer: {
    urlTemplate: getUrlTemplate(state),
    baseLayerOptions
  },
  center: state.map.viewCenter,
  clusterMarkers: getClusterMarkers(state),
  geoJson: getGeoJson(state),
  markers: getMarkers(state),
  layers: getLayers(state),
  drawShape: getDrawShape(state),
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
  }

  componentWillReceiveProps(nextProps) {
    const { uiState } = nextProps;
    if (uiState !== this.state.uiState) {
      this.updateMapBounds();
      this.setState({ uiState });
    }
  }

  updateMapBounds() {
    if (this.MapLeaflet) {
      setTimeout(() => {
        this.MapLeaflet.invalidateSize();
        this.MapLeaflet.fitGeoJson();
      });
    }
  }

  render() {
    const {
      baseLayer,
      center,
      clusterMarkers,
      drawShape,
      geoJson,
      layers,
      markers,
      onUpdateClick,
      onUpdatePan,
      onUpdateZoom,
      zoom
    } = this.props;
    return (
      <div>
        { baseLayer.urlTemplate && (
          <MapLeaflet
            baseLayer={baseLayer}
            center={center}
            clusterMarkers={clusterMarkers}
            drawShape={drawShape}
            geoJson={geoJson}
            layers={layers}
            mapOptions={mapOptions}
            markers={markers}
            onClick={onUpdateClick}
            onDragEnd={onUpdatePan}
            onZoomEnd={onUpdateZoom}
            ref={this.setMapLeaflet}
            scaleControlOptions={scaleControlOptions}
            zoom={zoom}
          />
        )}
      </div>
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
  geoJson: PropTypes.shape({}),
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
