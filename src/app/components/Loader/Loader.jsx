import React from 'react';
import LoaderSVG from './loader.svg';
import './Loader.scss';

const Loader = () => (
  <span className="root-loading-indicator">
    <LoaderSVG />
  </span>
);

export default Loader;
