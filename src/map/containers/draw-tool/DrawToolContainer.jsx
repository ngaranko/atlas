import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DrawTool from '../../components/draw-tool/DrawTool';

import { mapClearDrawing, mapUpdateShape, mapStartDrawing, mapEndDrawing } from '../../../shared/ducks/map/map';
import { setDataSelectionGeometryFilter, resetDataSelectionGeometryFilter } from '../../../shared/ducks/data-selection/data-selection';
import { setPageName } from '../../../shared/ducks/page/page';
import { setMapFullscreen } from '../../../shared/ducks/ui/ui';

import {
  cancel,
  currentShape,
  disable,
  enable,
  initialize,
  isEnabled,
  setPolygon
} from '../../services/draw-tool/draw-tool';

export const toggleDrawing = (markers) => {
  if (isEnabled()) {
    disable();
  } else {
    if (markers > 0) {
      setPolygon([]);
    }
    enable();
  }
};

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
  onSetMapFullscreen: setMapFullscreen
}, dispatch);

// TODO: Remove hack to get business logic into presentational component
const DrawToolContainer = (props) => (
  <DrawTool
    currentShape={currentShape}
    toggleDrawing={toggleDrawing}
    cancel={cancel}
    initialize={initialize}
    isEnabled={isEnabled}
    setPolygon={setPolygon}
    {...props}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(DrawToolContainer);
