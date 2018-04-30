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
import { getGeometry } from '../../ducks/detail/map-detail';

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
  geometry: getGeometry(state),
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
      this.updateGeometry();
    };
  }

  componentWillReceiveProps(nextProps) {
    const { uiState } = nextProps;
    if (uiState !== this.state.uiState) {
      this.updateGeometry();
      this.setState({ uiState });
    }
  }

  updateGeometry() {
    if (!this.MapLeaflet) {
      return;
    }
    setTimeout(() => {
      this.MapLeaflet.invalidateSize();
      this.MapLeaflet.setGeometryMapBounds();
    });
  }

  render() {
    const {
      baseLayer,
      center,
      layers,
      markers,
      geometry,
      onUpdateClick,
      onUpdatePan,
      onUpdateZoom,
      zoom
    } = this.props;
    return (
      <div>
        { baseLayer.urlTemplate && (
          <MapLeaflet
            ref={this.setMapLeaflet}
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
  geometry: {},
  layers: [],
  markers: [],
  uiState: ''
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
  geometry: PropTypes.shape({}), //eslint-disable-line
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  zoom: PropTypes.number.isRequired,
  uiState: PropTypes.string.isRequired,
  onUpdateZoom: PropTypes.func.isRequired,
  onUpdatePan: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletContainer);
