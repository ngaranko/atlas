import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AngularWrapper } from 'react-angular';
import { isDetailLoading } from '../../shared/ducks/detail/selectors';
import { getUser } from '../../shared/ducks/user/user';
import { getApiSpecificationData } from '../../shared/ducks/datasets/datasets';
import { getLocationPayload } from '../../store/redux-first-router/selectors';
import { API_ROOT } from '../../shared/services/auth/auth';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  catalogFilters: getApiSpecificationData(state),
  user: getUser(state),
  endpoint: `${API_ROOT}dcatd/datasets/${getLocationPayload(state).id}` // TODO: refactor use API_ROOT and such
});

export const DatasetDetail = ({
  isLoading,
  catalogFilters,
  user,
  endpoint
}) => (
  <div className="c-dashboard__content qa-detail">
    <AngularWrapper
      moduleName={'dpDetailWrapper'}
      component="dpDetail"
      dependencies={['atlas']}
      bindings={{
        isLoading,
        catalogFilters,
        user
      }}
      interpolateBindings={{
        endpoint
      }}
    />
  </div>
);

DatasetDetail.defaultProps = {
  isLoading: false
};

DatasetDetail.propTypes = {
  isLoading: PropTypes.bool,
  catalogFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(DatasetDetail);
