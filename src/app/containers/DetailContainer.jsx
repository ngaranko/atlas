import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import {
  getDetailEndpoint,
  isDetailLoading,
  isDetailReloaded
} from '../../shared/ducks/detail/detail';
import { getUser } from '../../shared/ducks/user/user';

const mapStateToProps = (state) => ({
  reload: isDetailReloaded(state),
  isLoading: isDetailLoading(state),
  user: getUser(state),
  endpoint: getDetailEndpoint(state)
});

const DetailContainer = ({
  reload,
  isLoading,
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
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(DetailContainer);
