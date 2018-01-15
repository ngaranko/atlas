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
  shapeMarkers: state.map.shapeMarkers,
  shapeDistanceTxt: state.map.shapeDistanceTxt
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onClearDrawing: mapClearDrawing
}, dispatch);

class DrawTool extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="draw-tool">
        <ToggleDrawing
          drawingMode={this.props.drawingMode}
          shapeMarkers={this.props.shapeMarkers}
        />
        <ShapeSummary
          shapeMarkers={this.props.shapeMarkers}
          shapeDistanceTxt={this.props.shapeDistanceTxt}
          onClearDrawing={this.props.onClearDrawing}
        />
        <PointsAvailable
          shapeMarkers={this.props.shapeMarkers}
        />
      </section>
    );
  }
}

DrawTool.contextTypes = {
  store: PropTypes.object.isRequired
};

DrawTool.defaultProps = {
  geometry: null
};

DrawTool.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  shapeMarkers: PropTypes.number.isRequired,
  shapeDistanceTxt: PropTypes.string.isRequired,
  onClearDrawing: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawTool);
