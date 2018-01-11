import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';

import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';
import ToggleDrawing from '../../components/toggle-drawing/ToggleDrawing';

const mapStateToProps = (state) => ({
  drawingMode: state.map.drawingMode,
  geometry: state.map.geometry,
  dataSelection: state.dataSelection,
  isFullscreen: state.ui.isMapFullscreen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleFullscreen: toggleMapFullscreen
}, dispatch);

const MapContainer = (props) => (
  <section className="map">
    <ToggleDrawing
      drawingMode={props.drawingMode}
      geometry={props.geometry}
      dataSelection={props.dataSelection}
    />
    <ToggleFullscreen
      isFullscreen={props.isFullscreen}
      onToggleFullscreen={props.onToggleFullscreen}
    />
  </section>
);


MapContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

MapContainer.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  geometry: PropTypes.array,
  dataSelection: PropTypes.object,
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
