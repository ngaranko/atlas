import React from 'react'
import PropTypes from 'prop-types'
import PAGES from '../../pages'
import TabBar from '../TabBar'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tab/Tab'
import Dataset from '../Dataset'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import DataSearchQuery from '../DataSearch/DataSearchQuery'
import {
  toDataSearch,
  toDatasetSearch,
  toArticleSearch,
  toPublicationSearch,
} from '../../../store/redux-first-router/actions'
import EditorialSearch from '../EditorialSearch'
import cmsQuery, { MAX_RESULTS } from './constants.config'
import usePagination from '../../utils/usePagination'

const QuerySearch = ({
  isLoading,
  query,
  numberOfDataResults,
  currentPage,
  filters,
  user,
  toSearchPage,
  numberOfDatasetResults,
}) => {
  const [{ data: articles, fetching: fetchingArticles }, fetchMoreArticles] = usePagination(
    cmsQuery,
    { q: query, types: 'article' },
    MAX_RESULTS,
    0,
  )
  const [
    { data: publications, fetching: fetchingPublications },
    fetchMorePublications,
  ] = usePagination(cmsQuery, { q: query, types: 'publication' }, 2, 0)

  const resultMapper = () => {
    switch (currentPage) {
      case PAGES.DATA_SEARCH_QUERY:
        return numberOfDataResults
      case PAGES.PUBLICATION_SEARCH:
        return (publications && publications.count) || 0
      case PAGES.DATASET_SEARCH:
        return numberOfDatasetResults
      case PAGES.ARTICLE_SEARCH:
        return (articles && articles.count) || 0
      default:
        return 0
    }
  }

  return (
    <div className="c-data-selection c-dashboard__content">
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <div className="qa-data-selection-content">
          <TabBar numberOfResults={resultMapper()}>
            <Tabs currentPage={currentPage}>
              <Tab
                label="Data"
                count={numberOfDataResults}
                onClick={() => toSearchPage(toDataSearch, query, filters)}
                page={PAGES.DATA_SEARCH_QUERY}
              />
              <Tab
                label="Publicaties"
                count={publications && publications.count}
                onClick={() => toSearchPage(toPublicationSearch, query, filters)}
                page={PAGES.PUBLICATION_SEARCH}
              />
              <Tab
                label="Datasets"
                count={numberOfDatasetResults}
                onClick={() => toSearchPage(toDatasetSearch, query, filters)}
                page={PAGES.DATASET_SEARCH}
              />
              <Tab
                label="Artikelen"
                count={articles && articles.count}
                onClick={() => toSearchPage(toArticleSearch, query, filters)}
                page={PAGES.ARTICLE_SEARCH}
              />
            </Tabs>
          </TabBar>

          <div className="qa-search-results">
            {currentPage === PAGES.DATA_SEARCH_QUERY && (
              <DataSearchQuery numberOfResults={numberOfDataResults} user={user} />
            )}
            {currentPage === PAGES.DATASET_SEARCH && <Dataset />}
            {currentPage === PAGES.ARTICLE_SEARCH && (
              <EditorialSearch
                type={PAGES.ARTICLES}
                loading={fetchingArticles}
                results={articles}
                fetchMore={articles && articles.count >= MAX_RESULTS ? fetchMoreArticles : false}
              />
            )}
            {currentPage === PAGES.PUBLICATION_SEARCH && (
              <EditorialSearch
                type={PAGES.PUBLICATIONS}
                loading={fetchingPublications}
                results={publications}
                fetchMore={
                  publications && publications.count >= MAX_RESULTS ? fetchMorePublications : false
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
QuerySearch.defaultProps = {
  isLoading: true,
  query: undefined,
}

QuerySearch.propTypes = {
  user: PropTypes.shape({}).isRequired,
  filters: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  numberOfDataResults: PropTypes.number.isRequired,
  numberOfDatasetResults: PropTypes.number.isRequired,
  toSearchPage: PropTypes.func.isRequired,
}

export default QuerySearch
