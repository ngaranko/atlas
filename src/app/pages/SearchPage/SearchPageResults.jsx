import React, { memo, useMemo } from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, Button, Column, Heading, themeSpacing, Divider } from '@datapunt/asc-ui'
import { Enlarge } from '@datapunt/asc-assets'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import SEARCH_PAGE_CONFIG, { CMS_SEARCH_PAGES } from './config'
import ActionButton from '../../components/ActionButton/ActionButton'
import SearchResultsComponent from './SearchResultsComponent'
import SearchResults from './SearchResults'
import SearchSort from './SearchSort'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(4)};
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

const FilterButton = styled(Button)`
  align-self: flex-start;
  margin-bottom: ${themeSpacing(4)};
  display: block;
  flex-grow: 1;

  @media screen and ${breakpoint('max-width', 'mobileL')} {
    width: 100%;
    text-align: center;
  }
  @media screen and ${breakpoint('min-width', 'tabletS')} {
    max-width: 160px;
  }
  @media screen and ${breakpoint('min-width', 'laptop')} {
    display: none;
  }
`

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

const StyledDivider = styled(Divider)`
  margin-bottom: ${themeSpacing(5)};
`

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  sort,
}) => {
  // we need to memoize this until the results have been changed (prevents flashing no results content because fetching is set before results)
  const [initialLoading, showResults] = useMemo(
    () => [fetching && !fetchingMore, !fetching && !fetchingMore],
    [results],
  )

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
          {!initialLoading && (
            <StyledHeading>
              {showResults
                ? setTitle(
                    SEARCH_PAGE_CONFIG[currentPage].label,
                    totalCount.toLocaleString('nl-NL'),
                  )
                : `Geen resultaten met '${query}'`}
            </StyledHeading>
          )}
          {showResults && (
            <>
              <FilterWrapper>
                <FilterButton variant="primary" onClick={() => setShowFilter(true)}>
                  Filteren
                </FilterButton>
                {CMS_SEARCH_PAGES.includes(currentPage) && <SearchSort sort={sort} />}
              </FilterWrapper>
              {CMS_SEARCH_PAGES.includes(currentPage) && <StyledDivider />}
            </>
          )}
          {showResults && (
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
          )}
        </>
      )}
    </ResultColumn>
  )
}

export default memo(SearchPageResults)
