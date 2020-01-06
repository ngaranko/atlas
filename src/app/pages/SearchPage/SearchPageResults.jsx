import React, { memo } from 'react'
import styled from '@datapunt/asc-core'
import { Column, Heading, themeSpacing } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import EditorialResults from '../../components/EditorialResults'
import SEARCH_PAGE_CONFIG from './config'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import { EDITORIAL_TYPES } from '../../../shared/config/cms.config'
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'
import SearchLink from '../../components/Links/SearchLink/SearchLink'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(18)};
`

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
  width: inherit;
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
  width: inherit;
`

const getResultsComponent = (page, props) => {
  switch (page) {
    case PAGES.SPECIAL_SEARCH:
    case PAGES.SPECIALS:
    case PAGES.PUBLICATION_SEARCH:
    case PAGES.PUBLICATIONS:
    case PAGES.ARTICLE_SEARCH:
    case PAGES.ARTICLES:
      return <EditorialResults type={EDITORIAL_TYPES[page]} {...{ ...props }} />
    case PAGES.DATA_SEARCH:
      return <DataSearchResults {...{ ...props }} />
    case PAGES.DATASET_SEARCH:
      return <DatasetSearchResults {...{ ...props }} />
    default:
      return null
  }
}

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

const Results = ({ currentPage, results, errors, fetching, showLoadMore }) =>
  currentPage === PAGES.SEARCH
    ? results.length > 0 &&
      results.map(
        ({
          type: resultItemType,
          results: resultItemResults,
          totalCount: resultItemTotalCount,
        }) => {
          const to = SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].to()
          const label =
            SEARCH_PAGE_CONFIG[resultItemType] && SEARCH_PAGE_CONFIG[resultItemType].label

          return resultItemTotalCount > 0 ? (
            <ResultItem key={resultItemType}>
              <SearchHeading label={`${label} (${resultItemTotalCount})`} />
              <ResultsComponent>
                {getResultsComponent(resultItemType, {
                  results: resultItemResults,
                  loading: fetching,
                  compact: true, // Results in the search overview page are compact
                })}
              </ResultsComponent>
              <SearchLink to={to} label={`Resultaten tonen binnen de categorie '${label}'`} />
            </ResultItem>
          ) : (
            ''
          )
        },
      )
    : getResultsComponent(currentPage, { results, errors, loading: fetching, showLoadMore })

const SearchPageResults = ({
  errors,
  fetching,
  totalCount,
  results,
  currentPage,
  isOverviewPage,
  hasMore,
  fetchMore,
  fetchingMore,
  showLoadMore,
}) => {
  const hasResults = !fetching && !!results.length

  const setTitle = (label, count) =>
    isOverviewPage
      ? `${label} (${count})`
      : `Alle resultaten met categorie \`${label}\` (${count} resultaten)`

  return (
    <ResultColumn
      wrap
      span={{ small: 12, medium: 12, big: 12, large: 7, xLarge: 8 }}
      push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
    >
      {fetching && !fetchingMore && <LoadingIndicator style={{ position: 'inherit' }} />}
      {(hasResults || fetchingMore) && (
        <>
          <StyledHeading>
            {totalCount > 0
              ? setTitle(SEARCH_PAGE_CONFIG[currentPage].label, totalCount)
              : 'Geen resultaten'}
          </StyledHeading>
          <Results {...{ currentPage, results, fetching, showLoadMore, errors }} />
          {showLoadMore && hasMore && <LoadMoreButton {...{ fetching }} onClick={fetchMore} />}
        </>
      )}
    </ResultColumn>
  )
}

export default memo(SearchPageResults)
