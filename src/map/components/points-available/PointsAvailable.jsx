import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-cross-big.svg';

const PointsAvailable = () => {
  const markersLeft = 7 - window.drawTool.shape.markers.length;
console.log('PointsAvailable', markersLeft);

  // if (!window.drawTool.isEnabled() || markersLeft > 5) {
    // return null;
  // }

  return (
    <div class="points-available">
      <span className="points-available__label">Nog {markersLeft} punten mogelijk</span> 
    </div>
  );
}

PointsAvailable.propTypes = {
  // onClearDrawing: PropTypes.func.isRequired
};

export default PointsAvailable;
