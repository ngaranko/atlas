import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { AngularWrapper } from 'react-angular';

const mapStateToProps = (state) => ({
  user: state.user,
  endpoint: state.detail && state.detail.endpoint,
  reload: state.detail && state.detail.reload,
  isLoading: state.detail && state.detail.isLoading,
  skippedSearchResults: state.detail && state.detail.skippedSearchResults,
  catalogFilters: state.catalogFilters
});

const DetailContainer = ({ endpoint, reload, isLoading, skippedSearchResults, catalogFilters, user }) => (
  <AngularWrapper
    moduleName={'dpDetailWrapper'}
  >
    <div className="qa-detail">
      <dp-detail
        endpoint={endpoint}
        reload={reload}
        is-loading={isLoading}
        skipped-search-results={skippedSearchResults}
        catalog-filters={catalogFilters}
        user={user}
      />
    </div>
  </AngularWrapper>
);

DetailContainer.propTypes = {
  endpoint: PropTypes.string.isRequired,
  reload: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  skippedSearchResults: PropTypes.array.isRequired,
  catalogFilters: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(DetailContainer);
