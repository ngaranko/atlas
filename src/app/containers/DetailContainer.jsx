import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';

const mapStateToProps = (state) => ({
  reload: state.detail && state.detail.reload,
  isLoading: state.detail && state.detail.isLoading,
  skippedSearchResults: state.detail && state.detail.skippedSearchResults,
  user: state.user,
  endpoint: state.detail && state.detail.endpoint
});

const DetailContainer = ({
  reload,
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
        reload,
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
  reload: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  skippedSearchResults: PropTypes.bool,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(DetailContainer);
