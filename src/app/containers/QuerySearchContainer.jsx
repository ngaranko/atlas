import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import {
  getNumberOfResults,
  getSearchQuery,
  isSearchLoading
} from '../../shared/ducks/data-search/selectors';
import {
  getNumberOfResults as datasetNumberOfResults,
  isLoading as isDatasetsLoading
} from '../../shared/ducks/datasets/datasets';
import PAGES from '../pages';
import {
  getPage,
  toControlPage,
  toDataSearch,
  toDatasetSearch
} from '../../store/redux-first-router';
import TabBar from './TabBarContainer';
import Tabs from '../components/Tabs/Tabs';
import Tab from '../components/Tab/Tab';
import DatasetContainer from './DatasetContainer';
import LoadingIndicator from '../../shared/components/loading-indicator/LoadingIndicator';
import DataSearchContainer from './DataSearchContainer';

const mapStateToProps = (state) => ({
  isLoading: isDatasetsLoading(state) || isSearchLoading(state),
  query: getSearchQuery(state),
  numberOfDataResults: getNumberOfResults(state),
  numberOfDatasetResults: datasetNumberOfResults(state),
  currentPage: getPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  toDataPage: (...args) => dispatch(toDataSearch(...args)),
  toDatasetPage: (...args) => dispatch(toDatasetSearch(...args))
});

const QuerySearchContainer = ({
  isLoading,
  query,
  numberOfDataResults,
  numberOfDatasetResults,
  currentPage,
  toDataPage,
  toDatasetPage
}) => {
  const noResults = (!numberOfDataResults && !numberOfDatasetResults);
  const someResults = true; // !!(numberOfDataResults || numberOfDatasetResults);
  return (
    <div className="c-data-selection c-dashboard__content">
      {(isLoading) && <LoadingIndicator />}
      {!isLoading && someResults && (
        <div className="qa-data-selection-content">
          <TabBar showDatasetsButton={currentPage === PAGES.SEARCH_DATASETS}>
            <Tabs
              currentTab={(currentPage === PAGES.DATA_SEARCH) ? 'Data' : 'Datasets'}
              noResults={noResults}
              tip={(PAGES.DATA_SEARCH === currentPage) ?
                'maak de zoekcriteria minder specifiek (bijv. een straat i.p.v. specifiek adres)' :
                `maak de zoekcriteria minder specifiek. Of probeer in plaats van zoeken eens de
              optie 'Alle datasets tonen' en filter vervolgens op thema.`
              }
            >
              <Tab
                label="Data"
                count={numberOfDataResults}
                onClick={() => toDataPage(query, true)}
              />
              <Tab
                label="Datasets"
                count={numberOfDatasetResults}
                onClick={() => toDatasetPage(query, true)}
              />
            </Tabs>
          </TabBar>
          {noResults && (
            <div>
              Tip: maak de zoekcriteria minder specifiek. Medewerkers/ketenpartners van Gemeente
              Amsterdam kunnen inloggen om meer gegevens te zien, zie
              <Link
                to={toControlPage()}
              >
                Help &gt; Bediening &gt; Inloggen
              </Link>.
            </div>
          )}
          <div className="qa-search-results">
            {(currentPage === PAGES.DATA_SEARCH &&
              <DataSearchContainer />
            )}
            {(currentPage === PAGES.SEARCH_DATASETS &&
              <DatasetContainer />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

QuerySearchContainer.defaultProps = {
  isLoading: true,
  query: undefined
};

QuerySearchContainer.propTypes = {
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  toDatasetPage: PropTypes.func.isRequired,
  toDataPage: PropTypes.func.isRequired,
  numberOfDataResults: PropTypes.number.isRequired,
  numberOfDatasetResults: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(QuerySearchContainer);
