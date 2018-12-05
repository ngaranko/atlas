import React from 'react';
import { AngularWrapper } from 'react-angular';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DATA_SELECTION_CONFIG from '../../../shared/services/data-selection/data-selection-config';
import NotAuthorizedPanel from '../PanelMessages/NotAuthorizedMessage';
import DatasetActiveFilters from '../../containers/DatasetActiveFiltersContainer';
import { DEFAULT_DATASET } from '../../../shared/ducks/datasets/data/data';
import MaxPageMessage from '../PanelMessages/MaxPageMessage';

const Dataset = ({
  setPage,
  activeFilters,
  results: {
    numberOfRecords,
    numberOfPages,
    data,
    filters: availableFilters
  },
  authError,
  page: currentPage,
  apiSpecification
}) => {
  const showFilters = numberOfRecords > 0;
  const { MAX_AVAILABLE_PAGES } = DATA_SELECTION_CONFIG.datasets[DEFAULT_DATASET];
  const showMessageMaxPages = MAX_AVAILABLE_PAGES && currentPage > MAX_AVAILABLE_PAGES;

  const widthClass = classNames({
    'u-col-sm--12': !showFilters,
    'u-col-sm--9': showFilters
  });

  return (
    <div>
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
  );
};

Dataset.propTypes = {
  activeFilters: PropTypes.shape({}).isRequired,
  authError: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  apiSpecification: PropTypes.shape().isRequired,
  results: PropTypes.shape({
    numberOfRecords: PropTypes.number,
    numberOfPages: PropTypes.number,
    filters: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default Dataset;
