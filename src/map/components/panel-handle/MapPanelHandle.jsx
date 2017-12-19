import React from 'react';
import PropTypes from 'prop-types';

import CollapseIcon from '../../../../public/images/icon-arrow-down.svg';
import ExpandIcon from '../../../../public/images/icon-arrow-up.svg';

const MapPanelHandle = (props) => (
  <div className={`
    map-panel-handle
    map-panel-handle--${props.isMapPanelHandleVisible ? 'visible' : 'hidden'}
  `}
  >
    <button
      className="map-panel-handle__toggle"
      onClick={props.onMapPanelHandleToggle}
    >
      {props.isMapPanelHandleVisible
        ? <span><CollapseIcon /><span className="u-sr-only">Kaartlagen verbergen</span></span>
        : <span><ExpandIcon /><span className="u-sr-only">Kaartlagen tonen</span></span>
      }
    </button>
    {props.isMapPanelHandleVisible && props.children}
  </div>
);

MapPanelHandle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isMapPanelHandleVisible: PropTypes.bool.isRequired,
  onMapPanelHandleToggle: PropTypes.func.isRequired
};

export default MapPanelHandle;
