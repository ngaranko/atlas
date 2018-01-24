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

import { initialize, cancel, isEnabled, setPolygon, currentShape } from '../../services/draw-tool/draw-tool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';

import './_draw-tool.scss';

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

    this.state = {
      drawingMode: props.drawingMode,
      previousMarkers: []
    };

    this.onFinishShape = this.onFinishShape.bind(this);
    this.onDrawingMode = this.onDrawingMode.bind(this);
    this.onUpdateShape = this.onUpdateShape.bind(this);
    this.setPolygon = this.setPolygon.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
    this.toggleMapFullscreen = this.toggleMapFullscreen.bind(this);

    initialize(window.leafletMap, this.onFinishShape, this.onDrawingMode,
      this.onUpdateShape);

    this.setPolygon();
  }

  componentWillReceiveProps(props) {
    const markers = this.getMarkers();

    if (!isEqual(this.state.previousMarkers, markers)) {
      // if the markers have changed save the new markers as previous markers
      this.setPolygon();
      this.setState({ previousMarkers: [...markers] });
    }

    if (props.dataSelection === null && props.geometry === null &&
      props.drawingMode === drawToolConfig.DRAWING_MODE.NONE) {
      // if dataSelection and geometry are empty then remove the drawn polygon
      setPolygon([]);
    }

    if (this.state.drawingMode !== props.drawingMode) {
      if (props.drawingMode === drawToolConfig.DRAWING_MODE.NONE) {
        // after drawing mode has changed the draw tool should be cancelled after navigating
        cancel();
      }
      this.setState({ drawingMode: props.drawingMode });
    }
  }

  onFinishShape(polygon) {
    const has2Markers = polygon && polygon.markers && polygon.markers.length === 2;
    const moreThan2Markers = polygon && polygon.markers && polygon.markers.length > 2;

    if (moreThan2Markers) {
      this.props.setGeometryFilter({
        markers: polygon.markers,
        description: `${currentShape.distanceTxt} en ${currentShape.areaTxt}`
      });

      this.props.onEndDrawing({ polygon });
      this.props.onSetPageName({ name: null });
      this.toggleMapFullscreen();
    } else if (has2Markers) {
      this.props.onEndDrawing({ polygon });
    } else {
      this.toggleMapFullscreen();
    }
  }

  onDrawingMode(drawingMode) {
    if (drawingMode !== drawToolConfig.DRAWING_MODE.NONE) {
      this.setState({ previousMarkers: [...currentShape.markers] });
      this.props.resetGeometryFilter({ drawingMode });
      this.props.onStartDrawing({ drawingMode });
    }
  }

  onUpdateShape(newShape) {
    this.props.onMapUpdateShape({
      shapeMarkers: newShape.markers.length,
      shapeDistanceTxt: newShape.distanceTxt,
      shapeAreaTxt: newShape.areaTxt
    });
  }

  setPolygon() {
    if (!isEnabled()) {
      setPolygon(this.getMarkers());
    }
  }

  getMarkers() {
    return this.props.geometry && this.props.geometry.length > 0 ? this.props.geometry :
      ((this.props.dataSelection && this.props.dataSelection.geometryFilter &&
      this.props.dataSelection.geometryFilter.markers) || []);
  }

  toggleMapFullscreen() {
    if (this.props.uiMapFullscreen) {
      this.props.onToggleMapFullscreen();
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
          drawingMode={this.props.drawingMode}
        />
      </section>
    );
  }
}

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
