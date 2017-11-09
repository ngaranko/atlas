import React from 'react';

import './_loading-indicator.scss';
import SpinnerIcon from '../../../../public/images/icon-tick.svg';

const LoadingIndicator = () => (
  <span className="loading-indicator">
    <SpinnerIcon />
  </span>
);

export default LoadingIndicator;
