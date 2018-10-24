import React from 'react';
import { AngularWrapper } from 'react-angular';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getNewDataSelection,
  getNewDataSelectionResult,
  VIEWS
} from '../../../shared/ducks/new-data-selection/new-data-selection';
import DATA_SELECTION_CONFIG from '../../../shared/services/data-selection/data-selection-config';
import { getUser } from '../../../shared/ducks/user/user';
import NotAuthorizedPanel from '../NotAuthorizedMessage/NotAuthorizedMessage';
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator';

class DataSelection extends React.Component {
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
      geometryFilter,
      user,
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
    const queryView = query.trim().length >= 1;
    const showTabHeader = (view === VIEWS.CATALOG) && queryView;
    const showHeader = !showTabHeader && (view === VIEWS.LIST || !isLoading);
    const showFilters = (view !== VIEWS.LIST) && numberOfRecords > 0;
    const maxAvailablePages = DATA_SELECTION_CONFIG.datasets[dataset].MAX_AVAILABLE_PAGES;
    const showMessageMaxPages = maxAvailablePages && currentPage > maxAvailablePages;
    const maxNumberOfClusteredMarkers = DATA_SELECTION_CONFIG.datasets[dataset].MAX_NUMBER_OF_CLUSTERED_MARKERS;
    const showMessageClusteredMarkers = (view === VIEWS.LIST) && numberOfRecords > maxNumberOfClusteredMarkers;
    // const showContent = (numberOfRecords && (
    //   !isDefined(maxAvailablePages) ||
    //   !isDefined(currentPage) ||
    //   currentPage <= maxAvailablePages // TODO refactor, get page through query parameter
    // )) || false;
    const showContent = true;

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
            {/*{showTabHeader && (*/}
            {/*<AngularWrapper*/}
            {/*moduleName={'dpTabHeaderWrapper'}*/}
            {/*component="dpTabHeader"*/}
            {/*dependencies={['atlas']}*/}
            {/*bindings={{*/}
            {/*tabHeader,*/}
            {/*filtersActive: true*/}
            {/*}}*/}
            {/*interpolateBinding={{*/}
            {/*searchText: query*/}
            {/*}}*/}
            {/*/>*/}
            {/*)}*/}

            {(!showTabHeader) && (
              <AngularWrapper
                moduleName={'dpDataSelectionHeaderWrapper'}
                component="dpDataSelectionHeader"
                dependencies={['atlas']}
                bindings={{
                  geometryFilter,
                  dataset,
                  availableFilters,
                  filters,
                  numberOfRecords,
                  showHeader,
                  user,
                  view
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
                            dan {maxNumberOfClusteredMarkers} resultaten tegelijk kan
                            weergeven (om technische redenen).</p>
                          <p className="c-panel__paragraph">Tip: Bekijk de lijst resultaten in
                            kleinere delen. Dit kan door een voor een filtercriteria toe te voegen
                            (bijv. de verschillende wijken uit de selectie).</p>
                        </div>
                      </AngularWrapper>
                    )}

                    {showContent && (
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
                        {view === VIEWS.CATALOG && (
                          <AngularWrapper
                            moduleName={'dpDataSelectionCatalogWrapper'}
                            component="dpDataSelectionCatalog"
                            dependencies={['atlas']}
                            bindings={{
                              content: data
                            }}
                          />
                        )}
                      </div>
                    )}
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
  view: getNewDataSelection(state).view,
  isLoading: getNewDataSelection(state).isLoading,
  numberOfRecords: getNewDataSelectionResult(state).numberOfRecords,
  dataset: getNewDataSelection(state).dataset,
  availableFilters: getNewDataSelectionResult(state).filters,
  filters: state.filters,
  numberOfPages: getNewDataSelectionResult(state).numberOfPages,
  data: getNewDataSelectionResult(state).data,
  currentPage: getNewDataSelectionResult(state).page,
  geometryFilter: getNewDataSelection(state).geometryFilter,
  authError: getNewDataSelection(state).authError,
  user: getUser(state)
});

export default connect(mapStateToProps, null)(DataSelection);
