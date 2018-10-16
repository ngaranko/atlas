import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';

const mapStateToProps = (state) => ({
  isLoading: state.search && state.search.isLoading,
  query: state.search && state.search.query,
  category: state.search && state.search.category,
  numberOfResults: state.search && state.search.numberOfResults,
  user: state.user
});

// TODO refactor, rename GeoSearchContainer
const QuerySearchContainer = ({
  isLoading,
  query,
  category,
  user,
  numberOfResults
}) => (
  <div className="qa-search-results">
    <AngularWrapper
      moduleName={'dpSearchResultsWrapper'}
      component="dpSearchResults"
      dependencies={['atlas']}
      bindings={{
        isLoading,
        query,
        user,
        numberOfResults
      }}
      interpolateBindings={{
        query,
        category
      }}
    />
  </div>
);

QuerySearchContainer.defaultProps = {
  isLoading: true,
  numberOfResults: undefined,
  query: undefined,
  category: undefined
};

QuerySearchContainer.propTypes = {
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  category: PropTypes.object, // eslint-disable-line
  numberOfResults: PropTypes.number,
  user: PropTypes.object.isRequired // eslint-disable-line
};

export default connect(mapStateToProps, null)(QuerySearchContainer);
