import React, { memo } from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, Button, Column, Heading, themeSpacing } from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import SEARCH_PAGE_CONFIG from './config'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'
import SearchLink from '../../components/Links/SearchLink/SearchLink'
import NoSearchResults from '../../components/NoSearchResults'
import SearchResultsComponent from './SearchResultsComponent'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(14)};
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(12)};
  }
`

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
  width: inherit;
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
  width: inherit;
`

const ResultWrapper = styled.div`
  margin-top: ${themeSpacing(4)};
`

const StyledButton = styled(Button)`
  align-self: flex-start;
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

export const Results = ({
  query,
  totalCount,
  currentPage,
  results,
  errors,
  fetching,
  showLoadMore,
}) => {
  console.log(currentPage)

  // eslint-disable-next-line no-nested-ternary
  return currentPage === PAGES.SEARCH ? (
    results.length > 0 && totalCount > 0 ? (
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
                <SearchResultsComponent
                  page={resultItemType}
                  {...{
                    results: resultItemResults,
                    loading: fetching,
                    compact: true, // Results in the search overview page are compact
                  }}
                />
              </ResultsComponent>
              <SearchLink to={to} label={`Resultaten tonen binnen de categorie '${label}'`} />
            </ResultItem>
          ) : (
            ''
          )
        },
      )
    ) : (
      <NoSearchResults data-test="NoSearchResults" query={query} />
    )
  ) : (
    <SearchResultsComponent
      page={currentPage}
      {...{ query, results, errors, loading: fetching, showLoadMore }}
    />
  )
}

/* istanbul ignore next */
const SearchPageResults = ({
  query,
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
  setShowFilter,
}) => {
  const hasResults = !fetching && !!results.length

  console.log(fetching, results)

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
            {totalCount > 0 && hasResults
              ? setTitle(SEARCH_PAGE_CONFIG[currentPage].label, totalCount)
              : `Geen resultaten met \`${query}\``}
          </StyledHeading>
          <StyledButton variant="primary" onClick={() => setShowFilter(true)}>
            Filteren
          </StyledButton>
          <ResultWrapper>
            <Results
              {...{ query, totalCount, currentPage, results, fetching, showLoadMore, errors }}
            />
            {showLoadMore && hasMore && <LoadMoreButton {...{ fetching }} onClick={fetchMore} />}
          </ResultWrapper>
        </>
      )}
    </ResultColumn>
  )
}

export default memo(SearchPageResults)
