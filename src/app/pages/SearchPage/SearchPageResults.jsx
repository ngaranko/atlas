import React, { memo } from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, Button, Column, Heading, themeSpacing } from '@datapunt/asc-ui'
import { Enlarge } from '@datapunt/asc-assets'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import EditorialResults from '../../components/EditorialResults'
import SEARCH_PAGE_CONFIG from './config'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'
import SearchHeading from '../../components/SearchHeading/SearchHeading'
import ActionButton from '../../components/ActionButton/ActionButton'
import SearchLink from '../../components/Links/SearchLink/SearchLink'
import { EDITORIAL_TYPES } from '../EditorialOverviewPage/constants'
import NoSearchResults from '../../components/NoSearchResults'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(14)};
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(12)};
  }
`

const ResultsComponent = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const ResultItem = styled.div`
  margin-bottom: ${themeSpacing(18)};
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

const getResultsComponent = (page, props) => {
  switch (page) {
    case PAGES.SPECIAL_SEARCH:
    case PAGES.SPECIALS:
    case PAGES.PUBLICATION_SEARCH:
    case PAGES.PUBLICATIONS:
    case PAGES.ARTICLE_SEARCH:
    case PAGES.ARTICLES:
      return (
        <EditorialResults
          {...{
            ...props,
            label: SEARCH_PAGE_CONFIG[page].label,
            type: EDITORIAL_TYPES[page],
          }}
        />
      )
    case PAGES.DATA_SEARCH:
      return <DataSearchResults {...{ ...props, label: SEARCH_PAGE_CONFIG[page].label }} />
    case PAGES.DATASETS:
    case PAGES.DATASET_SEARCH:
      return <DatasetSearchResults {...{ ...props, label: SEARCH_PAGE_CONFIG[page].label }} />
    default:
      return null
  }
}

const ResultColumn = styled(Column)`
  flex-direction: column;
  justify-content: flex-start;
`

/* istanbul ignore next */
const Results = ({ query, totalCount, currentPage, results, errors, fetching, showLoadMore }) =>
  // eslint-disable-next-line no-nested-ternary
  currentPage === PAGES.SEARCH ? (
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
    ) : (
      <NoSearchResults query={query} />
    )
  ) : (
    getResultsComponent(currentPage, { query, results, errors, loading: fetching, showLoadMore })
  )

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
  const initialLoading = fetching && !fetchingMore
  const hasResults = !initialLoading && !!results.length

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
      {initialLoading && <LoadingIndicator style={{ position: 'inherit' }} />}

      {hasResults && (
        <>
          <StyledHeading>
            {totalCount > 0 && fetchingMore && !!results.length
              ? setTitle(SEARCH_PAGE_CONFIG[currentPage].label, totalCount)
              : `Geen resultaten met '${query}'`}
          </StyledHeading>
          <StyledButton variant="primary" onClick={() => setShowFilter(true)}>
            Filteren
          </StyledButton>
          <ResultWrapper>
            <Results
              {...{ query, totalCount, currentPage, results, fetching, showLoadMore, errors }}
            />
            {showLoadMore && hasMore && (
              <ActionButton
                label="Toon meer"
                iconLeft={<Enlarge />}
                {...{ fetching, onClick: fetchMore }}
              />
            )}
          </ResultWrapper>
        </>
      )}
    </ResultColumn>
  )
}

export default memo(SearchPageResults)
