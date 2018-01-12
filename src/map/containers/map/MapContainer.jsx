import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';
import { mapClearDrawing } from '../../../shared/ducks/map/map';

import ToggleDrawing from '../../components/toggle-drawing/ToggleDrawing';
import ShapeSummary from '../../components/shape-summary/ShapeSummary';
import PointsAvailable from '../../components/points-available/PointsAvailable';
import ToggleFullscreen from '../../components/toggle-fullscreen/ToggleFullscreen';

const mapStateToProps = (state) => ({
  drawingMode: state.map.drawingMode,
  numberOfDrawnMarkers: state.map.numberOfDrawnMarkers,
  geometry: state.map.geometry,
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
        numberOfDrawnMarkers={props.numberOfDrawnMarkers}
      />
      <ShapeSummary
        geometry={props.geometry}
        onClearDrawing={props.onClearDrawing}
      />
      <PointsAvailable
        numberOfDrawnMarkers={props.numberOfDrawnMarkers}
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

MapContainer.defaultProps = {
  geometry: null
};

MapContainer.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  numberOfDrawnMarkers: PropTypes.number.isRequired,
  geometry: PropTypes.object,
  onClearDrawing: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
