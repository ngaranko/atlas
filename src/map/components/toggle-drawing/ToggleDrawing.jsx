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

const ToggleDrawing = ({ drawingMode, geometry, dataSelection }) => (
  <button
    className="toggle-drawing"
    onClick={() => toggleDrawing()}
  >
    <Icon className="toggle-drawing__icon" />
    <span className="toggle-drawing__label">
      {drawingMode === 'draw' ? 'Eindig' : ''}
      {(geometry && geometry.length > 0) ||
        (dataSelection && dataSelection.geometryFilter.markers.length > 0) ? 'Opnieuw' : ''}
    </span>
  </button>
);

ToggleDrawing.defaultProps = {
  geometry: null,
  dataSelection: null
};

ToggleDrawing.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  geometry: PropTypes.array,  // eslint-disable-line react/forbid-prop-types
  dataSelection: PropTypes.object  // eslint-disable-line react/forbid-prop-types
};

export default ToggleDrawing;
