import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-measure.svg';

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

const ToggleDrawing = ({ drawingMode }) => (
  <button
    className="toggle-drawing"
    onClick={() => toggleDrawing()}
  >
    <Icon className="toggle-drawing__icon" />{drawingMode === 'draw' ? 'Eindig' : ''}
  </button>
);

ToggleDrawing.propTypes = {
  drawingMode: PropTypes.string.isRequired
};

export default ToggleDrawing;
