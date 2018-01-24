import React from 'react';
import PropTypes from 'prop-types';

import drawToolConfig from '../../services/draw-tool/draw-tool-config';

import './_points-available.scss';

const PointsAvailable = ({ shapeMarkers ,drawingMode }) => {
  const markersLeft = drawToolConfig.MAX_MARKERS - shapeMarkers;

  if (markersLeft > drawToolConfig.MARKERS_LEFT_WARNING || drawingMode === drawToolConfig.DRAWING_MODE.NONE) {
    return null;
  } else if (markersLeft === 0) {
    return (
      <div className="points-available">
        <span
          className="points-available__label"
          aria-label="Geen punten meer mogelijk"
        >
          Geen punten meer mogelijk
        </span>
      </div>
    );
  } else {
    return (
      <div className="points-available">
        <span
          aria-label={`Nog ${markersLeft} punt${markersLeft !== 1 ? 'en' : ''} mogelijk`}
          className="points-available__label"
        >
          Nog {markersLeft} punt{markersLeft !== 1 ? 'en' : ''} mogelijk
        </span>
      </div>
    );
  }
};

PointsAvailable.propTypes = {
  shapeMarkers: PropTypes.number.isRequired,
  drawingMode: PropTypes.string.isRequired
};

export default PointsAvailable;
