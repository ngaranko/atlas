import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import { isDetailLoading } from '../../shared/ducks/detail/detail';
import { getUser } from '../../shared/ducks/user/user';
import {
  getNumberOfResults,
  getSearchCategory,
  getSearchQuery
} from '../../shared/ducks/data-search/selectors';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  user: getUser(state),
  query: getSearchQuery(state),
  numberOfResults: getNumberOfResults(state),
  category: getSearchCategory(state)
});

const DetailContainer = ({
  isLoading,
  user,
  query,
  numberOfResults,
  category
}) => (
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
);

DetailContainer.defaultProps = {
  numberOfResults: 0
};

DetailContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  query: PropTypes.string.isRequired,
  numberOfResults: PropTypes.number,
  category: PropTypes.object // eslint-disable-line
};

export default connect(mapStateToProps, null)(DetailContainer);
