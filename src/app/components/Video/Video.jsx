/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import PropTypes from 'prop-types';

const Video = ({
  src, poster, type, setRef
}) => (
  <video
    ref={setRef}
    data-object-fit
    preload="metadata"
    muted="true"
    // width="{{vm.width}}"
    // height="{{vm.height}}"
    className="c-video__element"
    poster={poster}
    loop
  >
    <source
      {...{
        src,
        type
      }}
    />
  </video>
);

Video.propTypes = {
  setRef: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};

export default Video;
