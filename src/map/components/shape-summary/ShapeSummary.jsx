import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-cross-big.svg';

const ShapeSummary = ({ onClearDrawing }) => {
  if (window.drawTool.isEnabled() || window.drawTool.shape.markers.length !== 2) {
    return null;
  }
  return (
    <div className="shape-summary">
      <span className="shape-summary__label">Lijn: {window.drawTool.shape.distanceTxt}</span>
      <button
        onClick={onClearDrawing}
        title="Lijn verwijderen">
        <Icon
          className="shape-summary__icon"
        /><span className="u-sr-only">Lijn verwijderen</span>
      </button>
    </div>
  );
}

ShapeSummary.propTypes = {
  onClearDrawing: PropTypes.func.isRequired
};

export default ShapeSummary;
