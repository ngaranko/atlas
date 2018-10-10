import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MapContainer from '../../map/containers/map/MapContainer';
import Panorama from '../containers/PanoramaContainer';
import DetailContainer from '../containers/DetailContainer';
import SearchContainer from '../containers/SearchContainer';
import PAGES from '../pages';

const Map = ({ columnSizes, subPage }) => {
  const sizeMap = subPage ? 4 : 12;
  const sizeSide = 12 - sizeMap;
  const classes = classNames({ 'u-page-break-after': columnSizes.middle && columnSizes.right });

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
  subPage: false,
  columnSizes: { // determineColumnSizes in dashboard-columns
    right: 4,
    middle: 12
  }
};

Map.propTypes = {
  subPage: PropTypes.oneOf([...Object.keys(PAGES).map((key) => PAGES[key]), false]),
  columnSizes: PropTypes.shape({
    right: PropTypes.number,
    middle: PropTypes.number
  })
};

export default Map;
