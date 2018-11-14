import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import SearchContainer from '../containers/SearchContainer';
import MapContainer from '../../map/containers/map/MapContainer';
import QuerySearchContainer from '../containers/QuerySearchContainer';
import { getSearchQuery } from '../../shared/ducks/data-search/data-search';
import { toMap as toMapActionCreator } from '../routes';
import SplitScreen from '../components/SplitScreen/SplitScreen';

/* istanbul ignore next */ // TODO: refactor, test
const SearchPage = ({ query, toMap }) => {
  if (query) {
    return <QuerySearchContainer />;
  }
  return (
    <SplitScreen
      leftComponent={(
        <div className="qa-map">
          <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
        </div>
      )}
      rightComponent={(
        <SearchContainer />
      )}
    />
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
