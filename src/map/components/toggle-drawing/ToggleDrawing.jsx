import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-measure.svg';

// temp remove window namespacing
function toggleDrawing() {
  if (window.drawTool.isEnabled()) {
    window.drawTool.disable();
  } else {
    if (window.drawTool.shape.markers.length > 0) {
      window.drawTool.setPolygon([]);
    }
    window.drawTool.enable();
  }
}

const ToggleDrawing = ({ drawingMode, numberOfDrawnMarkers }) => (
  <button
    className="toggle-drawing"
    onClick={() => toggleDrawing()}
  >
    <Icon className="toggle-drawing__icon" />
    <span className="toggle-drawing__label">
      {drawingMode !== 'none' ? 'Eindig' : ''}
      {drawingMode === 'none' && numberOfDrawnMarkers > 0 ? 'Opnieuw' : ''}
    </span>
  </button>
);

ToggleDrawing.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  numberOfDrawnMarkers: PropTypes.number.isRequired
};

export default ToggleDrawing;
