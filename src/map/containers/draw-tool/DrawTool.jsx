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
    console.log('drawtool constructor');

    this.previousMarkers = [];

    this.setPolygon = this.setPolygon.bind(this);
    this.onFinishShape = this.onFinishShape.bind(this);
    this.onDrawingMode = this.onDrawingMode.bind(this);
    this.onUpdateShape = this.onUpdateShape.bind(this);

    window.drawTool.initialize(window.leafletMap, this.onFinishShape, this.onDrawingMode,
      this.onUpdateShape);

    this.setPolygon();
  }

  onFinishShape(polygon) {
    console.log('onFinishShape');

    const moreThan2Markers = polygon && polygon.markers && polygon.markers.length > 2;

    if (moreThan2Markers) {
      this.props.setGeometryFilter({
        markers: polygon.markers,
        description: `${window.drawTool.shape.distanceTxt} en ${window.drawTool.shape.areaTxt}`
       });
    }

    if (isEqual(polygon.markers, this.previousMarkers)) {
      this.props.onEndDrawing();
    } else {
      this.props.onEndDrawing({ polygon });
    }

    if (this.props.uiMapFullscreen) {
      this.props.toggleMapFullscreen();
    }
  }

  onDrawingMode(drawingMode) {
    console.log('onDrawingMode', drawingMode, [...window.drawTool.shape.markers]);
    if (drawingMode === 'none') {
      // Make sure the NONE state goes into the store
      // We do not supply a payload, we do not finish a shape here
      this.props.onEndDrawing();

      if (this.props.uiMapFullscreen) {
        this.props.onToggleMapFullscreen();
      }
    } else {
      this.previousMarkers = [...window.drawTool.shape.markers];
      this.props.resetGeometryFilter({ drawingMode });
      this.props.onStartDrawing({ drawingMode });
      this.props.onSetPageName({ name: null });
    }
  }

  onUpdateShape(shape) {
    // console.log('onUpdateShape', shape);
    this.props.onMapUpdateShape({
      shapeMarkers: shape.markers.length,
      shapeDistanceTxt: shape.distanceTxt,
      shapeAreaTxt: shape.areaTxt
    });
  }

  setPolygon() {
    const markers = this.props.geometry ||
      this.props.dataSelection && this.props.dataSelection.geometryFilter &&
      this.props.dataSelection.geometryFilter.markers;
      
    console.log('setPolygon', markers);
    if (!window.drawTool.isEnabled()) {
      console.log('window.drawTool.setPolygon', markers);
      window.drawTool.setPolygon(markers);
      if (this.props.drawingMode !== 'none') {
        window.drawTool.enable();
      }
    }
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
  onClearDrawing: PropTypes.func.isRequired,
  onStartDrawing: PropTypes.func.isRequired,
  onEndDrawing: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawTool);
