import React from 'react';
import PropTypes from 'prop-types';

const PointsAvailable = ({ numberOfDrawnMarkers }) => {
  const markersLeft = 8 - numberOfDrawnMarkers;

  if (markersLeft > 5) {
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
  numberOfDrawnMarkers: PropTypes.number.isRequired
};

export default PointsAvailable;
