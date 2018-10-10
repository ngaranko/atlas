import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MapContainer from '../../map/containers/map/MapContainer';
import Panorama from '../containers/PanoramaContainer';
import DetailContainer from '../containers/DetailContainer';
import SearchContainer from '../containers/SearchContainer';
import PAGES from '../pages';

const Map = ({ subPage }) => {
  const leftColumnWidth = 4;
  const totalColumnWidth = 12;
  const sizeMap = subPage ? leftColumnWidth : totalColumnWidth;
  const sizeSide = totalColumnWidth - sizeMap;
  const classes = classNames({ 'u-page-break-after': totalColumnWidth && leftColumnWidth });

  return (
    <div style={{ height: '100%' }}>
      <div
        className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle ${classes}`}
      >
        <div className="qa-map">
          <MapContainer />
        </div>
      </div>
      {subPage && (
        <div
          className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeSide} qa-dashboard__column--right`}
        >
          {((subPage === PAGES.KAART_PANORAMA)) && <Panorama />}
          {((subPage === PAGES.KAART_DETAIL)) && <DetailContainer />}
          {((subPage === PAGES.KAART_SEARCH)) && <SearchContainer />}
        </div>
      )}
    </div>
  );
};

Map.defaultProps = {
  subPage: false
};

Map.propTypes = {
  subPage: PropTypes.oneOf([...Object.keys(PAGES).map((key) => PAGES[key]), false])
};

export default Map;
