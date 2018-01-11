import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';
import { mapClearDrawing } from '../../../shared/ducks/map/map';

import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';
import ToggleDrawing from '../../components/toggle-drawing/ToggleDrawing';
import ShapeSummary from '../../components/shape-summary/ShapeSummary';

const mapStateToProps = (state) => ({
  drawingMode: state.map.drawingMode,
  geometry: state.map.geometry,
  dataSelection: state.dataSelection,
  isFullscreen: state.ui.isMapFullscreen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onClearDrawing: mapClearDrawing,
  onToggleFullscreen: toggleMapFullscreen
}, dispatch);

const MapContainer = (props) => (
  <section className="map">
    <div className="draw-tool">
      <ToggleDrawing
        drawingMode={props.drawingMode}
        geometry={props.geometry}
        dataSelection={props.dataSelection}
      />
      <ShapeSummary
        geometry={props.geometry}
        onClearDrawing={props.onClearDrawing}
      />
    </div>
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
  onClearDrawing: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
