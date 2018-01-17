import React from 'react';
import PropTypes from 'prop-types';

import drawToolConfig from '../../services/draw-tool/draw-tool-config';

const PointsAvailable = ({ shapeMarkers }) => {
  const markersLeft = drawToolConfig.MAX_MARKERS - shapeMarkers;

  if (markersLeft > drawToolConfig.MARKERS_LEFT_WARNING) {
    return null;
  } else if (markersLeft === 0) {
    return (
      <div className="points-available">
        <span className="points-available__label">Geen punten mogelijk</span>
      </div>
    );
  } else {
    return (
      <div className="points-available">
        <span className="points-available__label">
          Nog {markersLeft} punt{markersLeft !== 1 ? 'en' : ''}  mogelijk
        </span>
      </div>
    );
  }
};

PointsAvailable.propTypes = {
  shapeMarkers: PropTypes.number.isRequired
};

export default PointsAvailable;
