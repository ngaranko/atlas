import React from 'react';
import PropTypes from 'prop-types';

const MapDetailResultWrapper = ({ panoUrl, title, subTitle, children }) => (
  <section className="map-detail-result">
    <header
      className={`
        map-detail-result__header
        map-detail-result__header--${panoUrl ? 'pano' : 'no-pano'}
      `}
    >
      {panoUrl && (
        <img
          alt="Panoramabeeld"
          className="map-detail-result__header-pano"
          src={panoUrl}
        />
      )}
      <div className="map-detail-result__header-container">
        <h1 className="map-detail-result__header-title">{title}</h1>
        {subTitle && (
          <h2 className="map-detail-result__header-subtitle">{subTitle}</h2>
        )}
      </div>
    </header>
    {children && (
      <div>{children}</div>
    )}
  </section>
);

MapDetailResultWrapper.defaultProps = {
  children: null,
  subTitle: ''
};

MapDetailResultWrapper.propTypes = {
  children: PropTypes.element,
  panoUrl: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default MapDetailResultWrapper;
