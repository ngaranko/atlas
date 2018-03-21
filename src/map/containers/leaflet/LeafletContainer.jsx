import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DrawTool from '../../containers/draw-tool/DrawToolContainer'; //eslint-disable-line
import LeafletMap from '../../components/leaflet-map/LeafletMap';

import getMapConfig from '../../services/map-config';

import { getBaseLayer, updateZoom, updatePan } from '../../ducks/map/map';

const baseLayerOptions = getMapConfig().BASE_LAYER_OPTIONS;
const mapOptions = getMapConfig().MAP_OPTIONS;
const scaleControlOptions = getMapConfig().SCALE_OPTIONS;

const mapStateToProps = (state) => ({
  map: state.map,
  baseLayer: getBaseLayer(state, baseLayerOptions),
  center: state.map.viewCenter,
  zoom: state.map.zoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onUpdateZoom: updateZoom,
  onUpdatePan: updatePan
}, dispatch);

class LeafletContainer extends React.Component { //eslint-disable-line
  constructor(props) { //eslint-disable-line
    super(props);
  }

  render() {
    const {
      baseLayer,
      center,
      zoom,
      onUpdateZoom,
      onUpdatePan
    } = this.props;

    return (
      <div>
        <LeafletMap
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
  }
}

LeafletContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

LeafletContainer.propTypes = {
  map: PropTypes.shape({}).isRequired, //eslint-disable-line
  baseLayer: PropTypes.shape({}).isRequired, // eslint-disable-line
  center: PropTypes.array.isRequired, // eslint-disable-line
  zoom: PropTypes.number.isRequired,
  onUpdateZoom: PropTypes.func, // eslint-disable-line
  onUpdatePan: PropTypes.func, // eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(LeafletContainer);
