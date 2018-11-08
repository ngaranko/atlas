import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import SearchContainer from '../containers/SearchContainer';
import MapContainer from '../../map/containers/map/MapContainer';
import QuerySearchContainer from '../containers/QuerySearchContainer';
import { getSearchQuery } from '../../shared/ducks/data-search/data-search';
import { toMap as toMapActionCreator } from '../routes';

/* istanbul ignore next */ // TODO: refactor, test
const SearchPage = ({ query, toMap }) => {
  if (query) {
    return <QuerySearchContainer />;
  }
  const sizeMap = 4;
  const sizeDetail = 8;
  return (
    <div style={{ height: '100%' }}>
      <div
        className={`c-dashboard__column u-col-sm--${sizeMap} qa-dashboard__column--middle u-page-break-after`}
      >
        <div className="qa-map">
          <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
        </div>
      </div>
      <div
        className={`c-dashboard__column c-dashboard__content u-col-sm--${sizeDetail} qa-dashboard__column--right`}
      >
        <SearchContainer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  query: getSearchQuery(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toMap: toMapActionCreator
}, dispatch);

SearchPage.defaultProps = {
  query: undefined
};

SearchPage.propTypes = {
  query: PropTypes.string,
  toMap: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
