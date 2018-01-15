import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-cross-big.svg';

const ShapeSummary = ({ shapeMarkers, shapeDistanceTxt, onClearDrawing }) => {
  if (window.drawTool.isEnabled() || shapeMarkers !== 2) {
    return null;
  }
  return (
    <div className="shape-summary">
      <span className="shape-summary__label">Lijn: {shapeDistanceTxt}</span>
      <button
        onClick={onClearDrawing}
        title="Lijn verwijderen"
      >
        <Icon
          className="shape-summary__icon"
        /><span className="u-sr-only">Lijn verwijderen</span>
      </button>
    </div>
  );
};

ShapeSummary.propTypes = {
  shapeMarkers: PropTypes.number.isRequired,
  shapeDistanceTxt: PropTypes.string.isRequired,
  onClearDrawing: PropTypes.func.isRequired
};

export default ShapeSummary;
