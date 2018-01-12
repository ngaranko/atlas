import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mapClearDrawing } from '../../../shared/ducks/map/map';

import ToggleDrawing from '../../components/toggle-drawing/ToggleDrawing';
import ShapeSummary from '../../components/shape-summary/ShapeSummary';
import PointsAvailable from '../../components/points-available/PointsAvailable';

const mapStateToProps = (state) => ({
  drawingMode: state.map.drawingMode,
  numberOfDrawnMarkers: state.map.numberOfDrawnMarkers
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onClearDrawing: mapClearDrawing
}, dispatch);

const DrawTool = (props) => (
  <section className="draw-tool">
    <ToggleDrawing
      drawingMode={props.drawingMode}
      numberOfDrawnMarkers={props.numberOfDrawnMarkers}
    />
    <ShapeSummary
      onClearDrawing={props.onClearDrawing}
    />
    <PointsAvailable
      numberOfDrawnMarkers={props.numberOfDrawnMarkers}
    />
  </section>
);


DrawTool.contextTypes = {
  store: PropTypes.object.isRequired
};

DrawTool.defaultProps = {
  geometry: null
};

DrawTool.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  numberOfDrawnMarkers: PropTypes.number.isRequired,
  onClearDrawing: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawTool);
