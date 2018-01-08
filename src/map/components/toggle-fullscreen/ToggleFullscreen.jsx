import React from 'react';
import PropTypes from 'prop-types';

import MinimizeIcon from '../../../../public/images/icon-minimize.svg';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';

function clickHandler(event) {
  console.log('TOGGLE FULLSCREEN', event);
}

const ToggleFullscreen = (props) => (
  <button className="toggle-fullscreen"
    onClick={clickHandler}>
    {props.isFullscreen ? <MinimizeIcon /> : ''}
    {!props.isFullscreen ? <MaximizeIcon /> : ''}
  </button>
);

ToggleFullscreen.propTypes = {
  isFullscreen: PropTypes.bool.isRequired
};

export default ToggleFullscreen;
