import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isDetailLoading } from '../../shared/ducks/detail/detail';
import { getUser } from '../../shared/ducks/user/user';
import { getDatasetApiSpecification } from '../../shared/ducks/datasets/datasets';
import { getLocationPayload } from '../../store/redux-first-router';
import AngularWrapper from '../../react-angular/AngularWrapper';

const mapStateToProps = (state) => ({
  isLoading: isDetailLoading(state),
  catalogFilters: getDatasetApiSpecification(state),
  user: getUser(state),
  endpoint: `https://acc.api.data.amsterdam.nl/dcatd/datasets/${getLocationPayload(state).id}` // TODO: refactor use API_ROOT and such
});

const DatasetsDetailContainer = ({
  isLoading,
  catalogFilters,
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
        catalogFilters,
        user
      }}
      interpolateBindings={{
        endpoint
      }}
    />
  </div>
);

DatasetsDetailContainer.defaultProps = {
  isLoading: false
};

DatasetsDetailContainer.propTypes = {
  isLoading: PropTypes.bool,
  catalogFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  endpoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(DatasetsDetailContainer);
