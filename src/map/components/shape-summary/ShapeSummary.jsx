import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../../public/images/icon-cross-big.svg';

const ShapeSummary = () => (
  <div className="shape-summary">
      <span className="shape-summary__label">Lijn: {window.drawTool.shape.distanceTxt}</span>
      <button title="Lijn verwijderen"><Icon className="shape-summary__icon"/>
          <span class="u-sr-only">Lijn verwijderen</span>
      </button>
  </div>
);

ShapeSummary.defaultProps = {
  // geometry: null,
  // dataSelection: null
};

ShapeSummary.propTypes = {
  // drawingMode: PropTypes.string.isRequired,
  // geometry: PropTypes.array,  // eslint-disable-line react/forbid-prop-types
  // dataSelection: PropTypes.object  // eslint-disable-line react/forbid-prop-types
};

export default ShapeSummary;
