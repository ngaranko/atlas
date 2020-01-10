import React, { memo, useMemo } from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, Button, Column, Heading, themeSpacing } from '@datapunt/asc-ui'
import { Enlarge } from '@datapunt/asc-assets'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import SEARCH_PAGE_CONFIG from './config'
import ActionButton from '../../components/ActionButton/ActionButton'
import SearchResultsComponent from './SearchResultsComponent'
import SearchResults from './SearchResults'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(14)};
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(12)};
  }
`

const ResultWrapper = styled.div`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-top: ${themeSpacing(4)};
  }
  width: inherit;
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
  const initialLoading = fetching && !fetchingMore

  // we need to memoize this until the results have been changed (prevents flashing no results content because fetching is set before results)
  const hasNoResults = useMemo(() => !fetching && !fetchingMore && !totalCount, [results])

  const setTitle = (label, count) =>
    isOverviewPage
      ? `${label} (${count})`
      : `Alle resultaten met categorie '${label}' (${count} resultaten)`
  return (
    <ResultColumn
      wrap
      span={{ small: 12, medium: 12, big: 12, large: 7, xLarge: 8 }}
      push={{ small: 0, medium: 0, big: 0, large: 1, xLarge: 1 }}
    >
      {initialLoading ? (
        <LoadingIndicator style={{ position: 'inherit' }} />
      ) : (
        <>
          <StyledHeading>
            {hasNoResults
              ? `Geen resultaten met '${query}'`
              : setTitle(SEARCH_PAGE_CONFIG[currentPage].label, totalCount)}
          </StyledHeading>
          {!hasNoResults && (
            <StyledButton variant="primary" onClick={() => setShowFilter(true)}>
              Filteren
            </StyledButton>
          )}
          <ResultWrapper>
            {currentPage === PAGES.SEARCH ? (
              <SearchResults {...{ query, totalCount, results, loading: fetching }} />
            ) : (
              <SearchResultsComponent
                {...{
                  page: currentPage,
                  query,
                  results,
                  errors,
                  loading: fetching,
                  showLoadMore,
                  isOverviewPage,
                }}
              />
            )}
            {showLoadMore && hasMore && (
              <ActionButton
                label="Toon meer"
                iconLeft={<Enlarge />}
                {...{ fetching: fetchingMore, onClick: fetchMore }}
              />
            )}
          </ResultWrapper>
        </>
      )}
    </ResultColumn>
  )
}

export default memo(SearchPageResults)
