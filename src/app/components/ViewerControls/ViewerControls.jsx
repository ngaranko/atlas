import React from 'react';
import PropTypes from 'prop-types';
import './ViewerControls.scss';

const ViewerControls = ({
  topLeftComponent,
  bottomLeftComponent,
  topRightComponent,
  bottomRightComponent,
  metaData,
  className
}) => (
  <div className={`viewer-controls ${className}`}>
    <div className="viewer-controls-item viewer-controls-item--top-left">
      {topLeftComponent}
    </div>
    <div className="viewer-controls-item viewer-controls-item--top-right">
      {topRightComponent}
    </div>
    <div className="viewer-controls-item viewer-controls-item--bottom-left">
      {bottomLeftComponent}
    </div>
    <div className="viewer-controls-item viewer-controls-item--bottom-right">
      {bottomRightComponent}
      {metaData &&
      <div className="viewer-controls__meta">
        {metaData.map((string, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="viewer-controls__meta__item">{string}</div>
        ))}
      </div>
      }
    </div>
  </div>
);

ViewerControls.propTypes = {
  topLeftComponent: PropTypes.node,
  bottomLeftComponent: PropTypes.node,
  topRightComponent: PropTypes.node,
  bottomRightComponent: PropTypes.node,
  className: PropTypes.string,
  metaData: PropTypes.arrayOf(PropTypes.string)
};

ViewerControls.defaultProps = {
  topLeftComponent: null,
  bottomLeftComponent: null,
  topRightComponent: null,
  bottomRightComponent: null,
  className: '',
  metaData: []
};

export default ViewerControls;
