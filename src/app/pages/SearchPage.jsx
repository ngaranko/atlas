import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import SearchContainer from '../containers/SearchContainer';
import MapContainer from '../../map/containers/map/MapContainer';
import QuerySearchContainer from '../containers/QuerySearchContainer';
import { getDataSearchLocation, getSearchQuery } from '../../shared/ducks/data-search/data-search';

/* istanbul ignore next */ // TODO: refactor, test
const SearchPage = ({ query }) => {
  if (query) {
    return <QuerySearchContainer />;
  } else {
    const sizeMap = 4;
    const sizeDetail = 8;
    return (
      <div style={{ height: '100%' }}>
        <div
          className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle u-page-break-after`}
        >
          <div className="qa-map">
            <MapContainer isFullscreen={false} toggleFullscreen={() => {}} />
          </div>
        </div>
        <div
          className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeDetail} qa-dashboard__column--right`}
        >
          <SearchContainer />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  // location: getDataSearchLocation(state), // TODO use or remove
  query: getSearchQuery(state)
});

SearchPage.defaultProps = {
  query: undefined
};

SearchPage.propTypes = {
  query: PropTypes.string
};

export default connect(mapStateToProps, null)(SearchPage);
