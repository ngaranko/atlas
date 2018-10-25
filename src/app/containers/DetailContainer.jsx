import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import {
  getDetailEndpoint,
  // getDetailSkippedSearchResults,
  isDetailLoading
} from '../../shared/ducks/detail/detail';
import { getUser } from '../../shared/ducks/user/user';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  // skippedSearchResults: getDetailSkippedSearchResults(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state)
});

const DetailContainer = ({
  isLoading,
  skippedSearchResults,
  user,
  endpoint
}) => (
  <div className="qa-detail">
    <AngularWrapper
      moduleName={'dpDetailWrapper'}
      component="dpDetail"
      dependencies={['atlas']}
      bindings={{
        isLoading,
        skippedSearchResults,
        user
      }}
      interpolateBindings={{
        endpoint
      }}
    />
  </div>
);

DetailContainer.defaultProps = {
  skippedSearchResults: undefined
};

DetailContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  skippedSearchResults: PropTypes.bool,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(DetailContainer);
