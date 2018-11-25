import React from 'react';
import { AngularWrapper } from 'react-angular';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import DATA_SELECTION_CONFIG from '../../../shared/services/data-selection/data-selection-config';
import NotAuthorizedPanel from '../PanelMessages/NotAuthorizedMessage';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';
import { getActiveFilters } from '../../../shared/ducks/filters/filters';
import { getUser } from '../../../shared/ducks/user/user';
import DatasetActiveFilters from '../../containers/DatasetActiveFiltersContainer';
import {
  DEFAULT_DATASET, DEFAULT_VIEW,
  setPage as setPageAction
} from '../../../shared/ducks/datasets/data/data';
import MaxPageMessage from '../PanelMessages/MaxPageMessage';
import {
  dataIsLoading,
  getAuthError, getDatasetApiSpecification,
  getPage,
  getResults,
  getSearchText
} from '../../../shared/ducks/datasets/datasets';
import TabHeader from '../../../shared/services/tab-header/tab-header';

const Dataset = ({
  setPage,
  activeFilters,
  results: {
    numberOfRecords,
    numberOfPages,
    data,
    filters: availableFilters
  },
  isLoading,
  user,
  authError,
  page: currentPage,
  apiSpecification,
  searchText
}) => {
  if (isLoading || (!numberOfRecords && !authError)) {
    return <LoadingIndicator />;
  }

  // Todo: move query and showTabbHeader logic to search page
  const query = searchText || '';
  const showTabHeader = query.trim().length >= 1;

  const showFilters = numberOfRecords > 0;
  const { MAX_AVAILABLE_PAGES } = DATA_SELECTION_CONFIG.datasets[DEFAULT_DATASET];
  const showMessageMaxPages = MAX_AVAILABLE_PAGES && currentPage > MAX_AVAILABLE_PAGES;

  const tabHeader = new TabHeader('data-datasets');

  const widthClass = classNames({
    'u-col-sm--12': !showFilters,
    'u-col-sm--9': showFilters
  });

  return (
    <div className="c-data-selection c-dashboard__content">
      {!isLoading && numberOfRecords && (
        <div className="qa-data-selection-content">
          <AngularWrapper
            moduleName={'dpDataSelectionHeaderWrapper'}
            component="dpDataSelectionHeader"
            dependencies={['atlas']}
            bindings={{
              dataset: DEFAULT_DATASET,
              availableFilters,
              filters: activeFilters,
              numberOfRecords,
              showHeader: true,
              user,
              view: DEFAULT_VIEW
            }}
          />
          {showTabHeader && (
            <AngularWrapper
              moduleName={'dpTabHeaderWrapper'}
              component="dpTabHeader"
              dependencies={['atlas']}
              bindings={{
                tabHeader,
                filtersActive: true,
                searchText: query
              }}
              interpolateBinding={{
                searchText: query
              }}
            />
          )}

          <DatasetActiveFilters />

          <div className="u-grid qa-data-grid">
            <div className="u-row">
              {showFilters && (
                <div className="u-col-sm--3 c-data-selection__available-filters">
                  <AngularWrapper
                    moduleName="dpDataSelectionAvailableFiltersWrapper"
                    component="dpDataSelectionAvailableFilters"
                    dependencies={['atlas']}
                    bindings={{
                      availableFilters,
                      activeFilters
                    }}
                    interpolateBindings={{
                      dataset: DEFAULT_DATASET
                    }}
                  />
                </div>
              )}
              <div className={widthClass}>
                {showMessageMaxPages && (
                  <MaxPageMessage maxAvailablePages={MAX_AVAILABLE_PAGES} />
                )}

                <div>
                  <AngularWrapper
                    moduleName={'dpDataSelectionCatalogWrapper'}
                    component="dpDataSelectionCatalog"
                    dependencies={['atlas']}
                    bindings={{
                      content: data,
                      catalogFilters: apiSpecification
                    }}
                  />
                </div>
                <AngularWrapper
                  moduleName={'dpDataSelectionPaginationWrapper'}
                  component="dpDataSelectionPagination"
                  dependencies={['atlas']}
                  bindings={{
                    currentPage,
                    numberOfPages,
                    setPage
                  }}
                />
              </div>
            </div>
          </div>

          {authError && (
            <NotAuthorizedPanel />
          )}
        </div>
      )}
    </div>
  );
};

Dataset.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activeFilters: PropTypes.shape({}).isRequired,
  authError: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  user: PropTypes.shape({}).isRequired,
  setPage: PropTypes.func.isRequired,
  apiSpecification: PropTypes.shape().isRequired,
  results: PropTypes.shape({
    numberOfRecords: PropTypes.number,
    numberOfPages: PropTypes.number,
    filters: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  searchText: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isLoading: dataIsLoading(state),
  authError: getAuthError(state),
  page: getPage(state),
  activeFilters: getActiveFilters(state),
  results: getResults(state),
  user: getUser(state),
  apiSpecification: getDatasetApiSpecification(state),
  searchText: getSearchText(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setPage: setPageAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dataset);
