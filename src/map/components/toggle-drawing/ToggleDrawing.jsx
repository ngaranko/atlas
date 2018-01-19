import React from 'react';
import PropTypes from 'prop-types';

import drawTool from '../../services/draw-tool/draw-tool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';

import Icon from '../../../../public/images/icon-measure.svg';

import './_toggle-drawing.scss';

// temp remove window namespacing
function toggleDrawing() {
  if (drawTool.isEnabled()) {
    drawTool.disable();
  } else {
    if (drawTool.shape.markers.length > 0) {
      drawTool.setPolygon([]);
    }
    drawTool.enable();
  }
}

const ToggleDrawing = ({ drawingMode, shapeMarkers }) => (
  <button
    className="toggle-drawing"
    onClick={() => toggleDrawing()}
  >
    <Icon className="toggle-drawing__icon" />
    <span className="toggle-drawing__label">
      {drawingMode !== drawToolConfig.DRAWING_MODE.NONE ? 'Eindig' : ''}
      {drawingMode === drawToolConfig.DRAWING_MODE.NONE && shapeMarkers > 0 ? 'Opnieuw' : ''}
    </span>
  </button>
);

ToggleDrawing.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  shapeMarkers: PropTypes.number.isRequired
};

export default ToggleDrawing;
