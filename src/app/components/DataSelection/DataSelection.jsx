import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getDataSelection,
  getDataSelectionResult,
  VIEWS
} from '../../../shared/ducks/data-selection/data-selection';
import DATA_SELECTION_CONFIG from '../../../shared/services/data-selection/data-selection-config';
import { getUser } from '../../../shared/ducks/user/user';
import NotAuthorizedPanel from '../NotAuthorizedMessage/NotAuthorizedMessage';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';
import { getActiveFilters } from '../../../shared/ducks/filters/filters';
import DataSelectionActiveFilters from '../../containers/DataSelectionActiveFiltersContainer';

const DataSelection = ({
  view,
  isLoading,
  dataset,
  activeFilters,
  geometryFilter,
  user,
  authError,
  results,
  page: currentPage
}) => {
  const {
    numberOfRecords,
    filters: availableFilters,
    numberOfPages,
    data
  } = results;

  if (isLoading || (!numberOfRecords && !authError)) {
    return <LoadingIndicator />;
  }

  // Local state
  const showHeader = (view === VIEWS.LIST || !isLoading);
  const showFilters = (view !== VIEWS.LIST) && numberOfRecords > 0;
  const { MAX_AVAILABLE_PAGES, MAX_NUMBER_OF_CLUSTERED_MARKERS } =
    DATA_SELECTION_CONFIG.datasets[dataset];

  const showMessageMaxPages = MAX_AVAILABLE_PAGES && currentPage > MAX_AVAILABLE_PAGES;
  const showMessageClusteredMarkers =
    (view === VIEWS.LIST) && numberOfRecords > MAX_NUMBER_OF_CLUSTERED_MARKERS;

  const widthClass = classNames({
    'u-col-sm--12': !showFilters,
    'u-col-sm--9': showFilters
  });

  return (
    <div className="c-data-selection">
      <div className="qa-data-selection-content">
        <AngularWrapper
          moduleName={'dpDataSelectionHeaderWrapper'}
          component="dpDataSelectionHeader"
          dependencies={['atlas']}
          bindings={{
            geometryFilter,
            dataset,
            availableFilters,
            filters: activeFilters,
            numberOfRecords,
            showHeader,
            user,
            view
          }}
        />

        <DataSelectionActiveFilters />

        {(!authError) && (
          <div className="u-grid qa-data-grid">
            <div className="u-row">
              {showFilters && (
                <div className="u-col-sm--3 c-data-selection__available-filters">
                  {(dataset === 'hr') && (
                    <AngularWrapper
                      moduleName="dpSbiFilterWrapper"
                      component="dpSbiFilter"
                      dependencies={['atlas']}
                      bindings={{
                        availableFilters,
                        filters: activeFilters
                      }}
                    />
                  )}

                  <AngularWrapper
                    moduleName="dpDataSelectionAvailableFiltersWrapper"
                    component="dpDataSelectionAvailableFilters"
                    dependencies={['atlas']}
                    bindings={{
                      availableFilters,
                      activeFilters
                    }}
                    interpolateBindings={{
                      dataset
                    }}
                  />
                </div>
              )}
              <div className={widthClass}>
                {showMessageMaxPages && (
                  <AngularWrapper
                    moduleName={'dpPanelWrapper'}
                    component="dpPanel"
                    dependencies={['atlas']}
                    bindings={{
                      isPanelVisible: true,
                      canClose: true
                    }}
                    interpolateBindings={{
                      type: 'warning'
                    }}
                  >
                    <div className="qa-message-max-pages">
                      <h2 className="c-panel__title">Deze pagina kan niet worden getoond</h2>
                      <p className="c-panel__paragraph">
                        Alleen de eerste {MAX_AVAILABLE_PAGES} pagina&apos;s kunnen
                        worden
                        weergegeven (om technische redenen). Bij
                        downloaden worden wel alle resultaten opgenomen.
                      </p>
                      <p className="c-panel__paragraph">
                        Tip: Gebruik de download-knop om alle resultaten te bekijken. Of voeg
                        meer
                        filtercriteria
                        toe voor specifiekere resultaten.
                      </p>
                    </div>
                  </AngularWrapper>
                )}

                {showMessageClusteredMarkers && (
                  <AngularWrapper
                    moduleName={'dpPanelWrapper'}
                    component="dpPanel"
                    dependencies={['atlas']}
                    bindings={{
                      isPanelVisible: true,
                      canClose: true
                    }}
                    interpolateBindings={{
                      type: 'warning'
                    }}
                  >
                    <div className="qa-message-clustered-markers">
                      <p className="c-panel__paragraph">Deze resultaten worden niet getoond op
                        de
                        kaart, omdat deze niet meer
                        dan {MAX_NUMBER_OF_CLUSTERED_MARKERS} resultaten tegelijk kan
                        weergeven (om technische redenen).</p>
                      <p className="c-panel__paragraph">Tip: Bekijk de lijst resultaten in
                        kleinere delen. Dit kan door een voor een filtercriteria toe te voegen
                        (bijv. de verschillende wijken uit de selectie).</p>
                    </div>
                  </AngularWrapper>
                )}


                <div>
                  {view === VIEWS.TABLE && (
                    <AngularWrapper
                      moduleName={'dpDataSelectionTableWrapper'}
                      component="dpDataSelectionTable"
                      dependencies={['atlas']}
                      bindings={{
                        content: data,
                        dataset
                      }}
                    />
                  )}
                  {view === VIEWS.LIST && (
                    <AngularWrapper
                      moduleName={'dpDataSelectionListWrapper'}
                      component="dpDataSelectionList"
                      dependencies={['atlas']}
                      bindings={{
                        content: data
                      }}
                    />
                  )}
                </div>
                <AngularWrapper
                  moduleName={'dpDataSelectionPaginationWrapper'}
                  component="dpDataSelectionPagination"
                  dependencies={['atlas']}
                  bindings={{
                    currentPage,
                    numberOfPages
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {authError && (
          <NotAuthorizedPanel dataset={dataset} />
        )}
      </div>
    </div>
  );
};

DataSelection.defaultProps = {
  results: {}
};

DataSelection.propTypes = {
  view: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dataset: PropTypes.string.isRequired,
  activeFilters: PropTypes.shape({}).isRequired,
  geometryFilter: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  authError: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  results: PropTypes.shape({
    numberOfRecords: PropTypes.number,
    filters: PropTypes.arrayOf(PropTypes.object),
    numberOfPages: PropTypes.number,
    data: PropTypes.object
  })
};

const mapStateToProps = (state) => {
  const { view, isLoading, dataset, geometryFilter, authError, page } = getDataSelection(state);
  return ({
    view,
    isLoading,
    dataset,
    geometryFilter,
    authError,
    page,
    activeFilters: getActiveFilters(state),
    results: getDataSelectionResult(state),
    user: getUser(state)
  });
};

export default connect(mapStateToProps, null)(DataSelection);
