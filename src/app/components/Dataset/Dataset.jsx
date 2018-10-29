import React from 'react';
import { AngularWrapper } from 'react-angular';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getDataSelection,
  getDataSelectionResult,
  VIEWS
} from '../../../shared/ducks/data-selection/data-selection';
import DATA_SELECTION_CONFIG from '../../../shared/services/data-selection/data-selection-config';
import NotAuthorizedPanel from '../NotAuthorizedMessage/NotAuthorizedMessage';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';

class Dataset extends React.Component {
  render() {
    const {
      view,
      isLoading,
      numberOfRecords,
      dataset,
      availableFilters,
      filters,
      numberOfPages,
      data,
      currentPage,
      authError
    } = this.props;

    // ?
    const query = ''; // ?

    if (authError) {
      return <NotAuthorizedPanel dataset={dataset} />;
    }

    if (isLoading || !numberOfRecords || !dataset) {
      return <LoadingIndicator />;
    }

    // Local state
    const showTabHeader = query.trim().length >= 1;
    const showFilters = (view !== VIEWS.LIST) && numberOfRecords > 0;
    const maxAvailablePages = DATA_SELECTION_CONFIG.datasets[dataset].MAX_AVAILABLE_PAGES;
    const showMessageMaxPages = maxAvailablePages && currentPage > maxAvailablePages;

    const tabHeader = {}; // new TabHeader('data-datasets')
    const disabled = false; // todo

    const widthClass = classNames({
      'u-col-sm--12': !showFilters,
      'u-col-sm--9': showFilters
    });

    return (
      <div className="c-data-selection">


        {!isLoading && numberOfRecords && (
          <div className="qa-data-selection-content">
            {showTabHeader && (
              <AngularWrapper
                moduleName={'dpTabHeaderWrapper'}
                component="dpTabHeader"
                dependencies={['atlas']}
                bindings={{
                  tabHeader,
                  filtersActive: true
                }}
                interpolateBinding={{
                  searchText: query
                }}
              />
            )}

            {!disabled && (
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
                            filters
                          }}
                        />
                      )}

                      <AngularWrapper
                        moduleName="dpDataSelectionAvailableFiltersWrapper"
                        component="dpDataSelectionAvailableFilters"
                        dependencies={['atlas']}
                        bindings={{
                          availableFilters,
                          activeFilters: filters
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
                            Alleen de eerste {{ maxAvailablePages }} pagina's kunnen
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

                    <div>
                      <AngularWrapper
                        moduleName={'dpDataSelectionCatalogWrapper'}
                        component="dpDataSelectionCatalog"
                        dependencies={['atlas']}
                        bindings={{
                          content: data
                        }}
                      />
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  view: getDataSelection(state).view,
  isLoading: getDataSelection(state).isLoading,
  numberOfRecords: getDataSelectionResult(state).numberOfRecords,
  dataset: getDataSelection(state).dataset,
  availableFilters: getDataSelectionResult(state).filters,
  filters: state.filters,
  numberOfPages: getDataSelectionResult(state).numberOfPages,
  data: getDataSelectionResult(state).data,
  currentPage: getDataSelectionResult(state).page,
  authError: getDataSelection(state).authError
});

export default connect(mapStateToProps, null)(Dataset);
