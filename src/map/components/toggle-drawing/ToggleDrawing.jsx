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

const ToggleDrawing = ({ drawingMode, shapeMarkers }) => {
  const title = drawingMode !== drawToolConfig.DRAWING_MODE.NONE ? 'Eindig' :
    (shapeMarkers > 0 ? 'Opnieuw' : 'Begin');
  const label = title === 'Begin' ? '' : title;

  return (<button
    className="toggle-drawing"
    onClick={() => toggleDrawing()}
    title={`${title} meten en intekenen`}
    aria-label={`${title} meten en intekenen`}
  >
    <Icon className="toggle-drawing__icon" />
    <span className="u-sr-only">{`${title} meten en intekenen`}</span>
    <span className="toggle-drawing__label">
      {label}
    </span>
  </button>
  );
};

ToggleDrawing.propTypes = {
  drawingMode: PropTypes.string.isRequired,
  shapeMarkers: PropTypes.number.isRequired
};

export default ToggleDrawing;
