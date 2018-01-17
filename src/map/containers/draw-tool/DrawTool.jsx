import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import isEqual from 'lodash.isequal';

import { mapClearDrawing, mapUpdateShape, mapStartDrawing, mapEndDrawing } from '../../../shared/ducks/map/map';
import { setDataSelectionGeometryFilter, resetDataSelectionGeometryFilter } from '../../../shared/ducks/data-selection/data-selection';
import { setPageName } from '../../../shared/ducks/page/page';
import { toggleMapFullscreen } from '../../../shared/ducks/ui/ui';

import ToggleDrawing from '../../components/toggle-drawing/ToggleDrawing';
import ShapeSummary from '../../components/shape-summary/ShapeSummary';
import PointsAvailable from '../../components/points-available/PointsAvailable';

import drawTool from '../../services/draw-tool/draw-tool';

const mapStateToProps = (state) => ({
  drawingMode: state.map.drawingMode,
  shapeMarkers: state.map.shapeMarkers,
  shapeDistanceTxt: state.map.shapeDistanceTxt,
  dataSelection: state.dataSelection,
  geometry: state.map.geometry,
  uiMapFullscreen: state.ui.isMapFullscreen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onClearDrawing: mapClearDrawing,
  onMapUpdateShape: mapUpdateShape,
  setGeometryFilter: setDataSelectionGeometryFilter,
  resetGeometryFilter: resetDataSelectionGeometryFilter,
  onStartDrawing: mapStartDrawing,
  onEndDrawing: mapEndDrawing,
  onSetPageName: setPageName,
  onToggleMapFullscreen: toggleMapFullscreen
}, dispatch);

class DrawTool extends React.Component {
  constructor(props) {
    super(props);

    this.previousMarkers = [];

    this.state = {
      drawingMode: props.drawingMode,
      previousMarkers: []
    };

    this.setPolygon = this.setPolygon.bind(this);
    this.onFinishShape = this.onFinishShape.bind(this);
    this.onDrawingMode = this.onDrawingMode.bind(this);
    this.onUpdateShape = this.onUpdateShape.bind(this);

    drawTool.initialize(window.leafletMap, this.onFinishShape, this.onDrawingMode,
      this.onUpdateShape);

    this.setPolygon();
  }

  componentWillReceiveProps(props) {
    if (drawTool.isEnabled() && props.drawingMode === 'none') {
      this.setState({ drawingMode: 'draw' });
    } else {
      this.setState({ drawingMode: props.drawingMode });
    }

    if (this.state.drawingMode === 'none' && props.dataSelection === null) {
      drawTool.setPolygon([]);
    }
  }

  onFinishShape(polygon) {
    const moreThan2Markers = polygon && polygon.markers && polygon.markers.length > 2;

    if (moreThan2Markers) {
      this.props.setGeometryFilter({
        markers: polygon.markers,
        description: `${drawTool.shape.distanceTxt} en ${drawTool.shape.areaTxt}`
      });
    }

    if (isEqual(polygon.markers, this.state.previousMarkers)) {
      this.props.onEndDrawing();
    } else {
      this.props.onEndDrawing({ polygon });
    }

    if (this.props.uiMapFullscreen) {
      this.props.onToggleMapFullscreen();
    }
  }

  onDrawingMode(drawingMode) {
    if (drawingMode === 'none') {
      // Make sure the NONE state goes into the store
      // We do not supply a payload, we do not finish a shape here
      this.props.onEndDrawing();

      if (this.props.uiMapFullscreen) {
        this.props.onToggleMapFullscreen();
      }
    } else {
      this.setState({ previousMarkers: [...drawTool.shape.markers] });
      this.props.resetGeometryFilter({ drawingMode });
      this.props.onSetPageName({ name: null });
      this.props.onStartDrawing({ drawingMode });
    }
  }

  onUpdateShape(shape) {
    this.props.onMapUpdateShape({
      shapeMarkers: shape.markers.length,
      shapeDistanceTxt: shape.distanceTxt,
      shapeAreaTxt: shape.areaTxt
    });
  }

  setPolygon() {
    const markers = this.props.geometry ||
      this.props.dataSelection && this.props.dataSelection.geometryFilter &&
      this.props.dataSelection.geometryFilter.markers || [];

    if (!drawTool.isEnabled()) {
      drawTool.setPolygon(markers);
      if (this.props.drawingMode !== 'none') {
        drawTool.enable();
      }
    }
  }

  render() {
    return (
      <section className="draw-tool">
        <ToggleDrawing
          drawingMode={this.state.drawingMode}
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
  dataSelection: null,
  geometry: null
};

DrawTool.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  shapeMarkers: PropTypes.number.isRequired,
  shapeDistanceTxt: PropTypes.string.isRequired,
  dataSelection: PropTypes.object,
  geometry: PropTypes.array,
  uiMapFullscreen: PropTypes.bool.isRequired,

  onClearDrawing: PropTypes.func.isRequired,
  onMapUpdateShape: PropTypes.func.isRequired,
  setGeometryFilter: PropTypes.func.isRequired,
  resetGeometryFilter: PropTypes.func.isRequired,
  onStartDrawing: PropTypes.func.isRequired,
  onEndDrawing: PropTypes.func.isRequired,
  onSetPageName: PropTypes.func.isRequired,
  onToggleMapFullscreen: PropTypes.func.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(DrawTool);
