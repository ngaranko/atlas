import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchContainer from '../containers/SearchContainer';
import MapContainer from '../../map/containers/map/MapContainer';
import QuerySearchContainer from '../containers/QuerySearchContainer';
import { getSearchQuery } from '../../shared/ducks/data-search/selectors';
import { toMapAndPreserveQuery as toMapActionCreator } from '../../store/redux-first-router';
import SplitScreen from '../components/SplitScreen/SplitScreen';

const SearchPage = ({ query, toMap }) => {
  if (query) {
    return <QuerySearchContainer />;
  }
  return (
    <SplitScreen
      leftComponent={(
        <MapContainer isFullscreen={false} toggleFullscreen={toMap} />
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
