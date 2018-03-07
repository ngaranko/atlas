import React from 'react';
import PropTypes from 'prop-types';

import MaximizeIcon from '../../../../public/images/icon-maximize.svg';

const MapDetailResultWrapper = ({
  children, panoUrl, subTitle, title, onMaximize, onPanoPreviewClick
}) => (
  <section className="map-detail-result">
    <header
      className={`
        map-detail-result__header
        map-detail-result__header--${panoUrl ? 'pano' : 'no-pano'}
      `}
    >
      <button
        className={`
          map-detail-result__header-pano-button
          map-detail-result__header-pano-button--${panoUrl ? 'enabled' : 'disabled'}
        `}
        disabled={!panoUrl}
        onClick={onPanoPreviewClick}
        title={panoUrl ? 'Bekijk Panorama view' : 'Geen Panoramabeeld beschikbaar'}
      >
        {panoUrl && (
          <img
            alt="Panoramabeeld"
            className="map-detail-result__header-pano"
            height="292"
            src={panoUrl}
            width="438"
          />
        )}
        <div className="map-detail-result__header-container">
          <h1 className="map-detail-result__header-title">{title}</h1>
          {subTitle && (
            <h2 className="map-detail-result__header-subtitle">{subTitle}</h2>
          )}
        </div>
      </button>
    </header>
    <div className="map-detail-result__scroll-wrapper">
      {children && (
          [children]
      )}
      <footer className="map-search-results__footer">
        <button
          className="map-search-results__button"
          onClick={onMaximize}
          title="Volledig weergeven"
        >
          <MaximizeIcon className="map-search-results__button-icon" />
          Volledig weergeven
        </button>
      </footer>
    </div>
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
  title: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailResultWrapper;
