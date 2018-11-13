import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import {
  getNumberOfResults,
  getSearchCategory,
  getSearchQuery,
  isSearchLoading
} from '../../shared/ducks/data-search/data-search';
import { getUser } from '../../shared/ducks/user/user';

const mapStateToProps = (state) => ({
  isLoading: isSearchLoading(state),
  query: getSearchQuery(state),
  category: getSearchCategory(state),
  numberOfResults: getNumberOfResults(state),
  user: getUser(state)
});

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
