import React from 'react';
import PropTypes from 'prop-types';

import drawTool from '../../services/draw-tool/draw-tool';

import Icon from '../../../../public/images/icon-cross-big.svg';

import './_shape-summary.scss';

const ShapeSummary = ({ shapeMarkers, shapeDistanceTxt, onClearDrawing }) => {
  if (drawTool.isEnabled() || shapeMarkers !== 2) {
    return null;
  }
  return (
    <div className="shape-summary">
      <span
        className="shape-summary__label"
        aria-label={`Lijn: ${shapeDistanceTxt}`}
      >Lijn: {shapeDistanceTxt}
      </span>
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
