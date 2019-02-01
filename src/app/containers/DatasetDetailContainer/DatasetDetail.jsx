import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';

const DatasetDetail = ({
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
  catalogFilters: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  endpoint: PropTypes.string.isRequired
};

export default DatasetDetail;
