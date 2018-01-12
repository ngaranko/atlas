import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-cross-big.svg';

const PointsAvailable = ({ numberOfDrawnMarkers }) => {
  const markersLeft = 7 - numberOfDrawnMarkers;
console.log('PointsAvailable', numberOfDrawnMarkers);

  // if (!window.drawTool.isEnabled() || markersLeft > 5) {
    // return null;
  // }

  return (
    <div className="points-available">
      <span className="points-available__label">Nog {markersLeft} punten mogelijk</span>
    </div>
  );
};

PointsAvailable.propTypes = {
  // onClearDrawing: PropTypes.func.isRequired
};

export default PointsAvailable;
