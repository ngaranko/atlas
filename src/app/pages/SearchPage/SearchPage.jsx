import React, { memo, useEffect, useState } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { clearAllBodyScrollLocks, enableBodyScroll } from 'body-scroll-lock'
<<<<<<< HEAD
import {
  breakpoint,
  Column,
  Container,
  Row,
  Modal,
  themeSpacing,
  TopBar,
  Button,
  Heading,
  Spinner,
  themeColor,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import { Close } from '@datapunt/asc-assets'
=======
import { Container, Row } from '@datapunt/asc-ui'
>>>>>>> Add pagination to the searchpages, deleted unused filed, refactored search results to be less confusing
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import SEARCH_PAGE_CONFIG, {
  DEFAULT_LIMIT,
  DATA_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  EDITORIAL_SEARCH_PAGES,
  DATA_FILTERS,
} from './config'
import SearchPageResults from './SearchPageResults'
import SearchPageFilters from './SearchPageFilters'
import useCompare from '../../utils/useCompare'
import useSelectors from '../../utils/useSelectors'
import { getActiveFilters, getSort, getPage } from './SearchPageDucks'
import useDocumentTitle from '../../utils/useDocumentTitle'
<<<<<<< HEAD

const FilterColumn = styled(Column)`
  align-content: flex-start;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

const ModalCloseButton = styled(Button)`
  margin-left: auto;
`

const StyledModal = styled(Modal)`
  ${FilterColumn} {
    top: 0;
    width: 100%;
    display: block;
    overflow-y: scroll;
    left: 0;
    right: ${themeSpacing(5)};
    padding: ${themeSpacing(5)};
    flex-grow: 1;
  }

  [role='dialog'] {
    max-width: calc(400px + ${themeSpacing(12)});
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    max-height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    pointer-events: all;
    transform: initial;
  }
`

const ApplyFilters = styled.div`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: ${themeSpacing(4)};
  background-color: #fff;
  box-shadow: 0 0 ${themeSpacing(2)} 1px black;
  margin-top: auto;
  position: relative; // No idea why, but this will make sure the box-shadow overlaps the borders of the sibling components
`

const ApplyFiltersButton = styled(Button)`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`
=======
import usePagination from './usePagination'

function getSortIntput(sortString) {
  let sort
  if (sortString && sortString.length) {
    const [field, order] = sortString.split(':')
    sort = {
      field,
      order,
    }
  }
  return sort
}
>>>>>>> Add pagination to the searchpages, deleted unused filed, refactored search results to be less confusing

const StyledTopBar = styled(TopBar)`
  border-bottom: 2px solid ${themeColor('tint', 'level3')};
`

/* TODO: Write tests for the Hooks used in this component */
/* istanbul ignore next */
const SearchPage = ({ isOverviewPage, currentPage, query }) => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [sort, page, activeFilters] = useSelectors([getSort, getPage, getActiveFilters])
  const defaultSort = isOverviewPage ? 'date:desc' : ''

  const { documentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  const isSearchPage = [...EDITORIAL_SEARCH_PAGES, ...DATASET_SEARCH_PAGES].includes(currentPage)
  const isDataSearchPage = DATA_SEARCH_PAGES.includes(currentPage)

  // Pagination is needed on the search pages with a single query unless the dataSearchQuery which also needs activeFilters
  const withPagination =
    isSearchPage ||
    !!(isDataSearchPage && activeFilters.find(filter => filter.type === DATA_FILTERS)) ||
    false

  useEffect(() => {
    if (documentTitle) {
      trackPageView({ documentTitle })
    }
  }, [documentTitle])

<<<<<<< HEAD
  // Hide filter when orientation changes to prevent layout issues.
  useEffect(() => {
    function onOrientationChange() {
      setShowFilter(false)
    }

    window.addEventListener('orientationchange', onOrientationChange)

    return () => window.removeEventListener('orientationchange', onOrientationChange)
  }, [])

  const {
    fetching,
    errors,
    totalCount,
    fetchingMore,
    results,
    filters,
    fetchMore,
    hasMore,
  } = usePagination(
    SEARCH_PAGE_CONFIG[currentPage],
=======
  const { fetching, errors, totalCount, filters, results, pageInfo } = usePagination(
    SEARCH_PAGE_CONFIG[currentPage].query,
>>>>>>> Add pagination to the searchpages, deleted unused filed, refactored search results to be less confusing
    {
      q: query,
      page: withPagination ? page : null, // In case the pagination doesn't gets deleted when changing routes
      sort: getSortIntput(sort || defaultSort),
      limit: !withPagination ? DEFAULT_LIMIT : null,
      withPagination, // Without this no PageInfo will be returned, so the CompactPager won't be rendered
      filters: activeFilters,
    },
    SEARCH_PAGE_CONFIG[currentPage].resolver,
  )

  const currentPageHasChanged = useCompare(currentPage)

  // Close the filterbox when changing the page
  useEffect(() => {
    if (currentPageHasChanged) {
      setShowFilter(false)
    }
  }, [currentPage])

  // Enable / disable body lock when opening the filter on mobile
  useEffect(() => {
    const action = showFilter || currentPageHasChanged ? clearAllBodyScrollLocks : enableBodyScroll
    action()
  }, [showFilter, currentPage])

  // Only the initial loading state should render the skeleton components, this prevents unwanted flickering when changing query variables
  useEffect(() => {
    if (currentPageHasChanged) {
      // If the page changes, the skeleton components must be rendered
      setInitialLoading(true)
    }

    if (!!results && !fetching) {
      setInitialLoading(false)
    }
  }, [currentPage, results, fetching])

  return (
    <Container>
      <ContentContainer>
        <Row>
<<<<<<< HEAD
          {!showFilter && Filters}
          <StyledModal
            aria-labelledby="filters"
            aria-describedby="filters"
            open={showFilter}
            onClose={() => setShowFilter(false)}
            hideOverFlow={false}
            zIndexOffset={1}
          >
            <StyledTopBar>
              <Heading style={{ flexGrow: 1 }} as="h4">
                <ModalCloseButton
                  variant="blank"
                  type="button"
                  size={30}
                  onClick={() => setShowFilter(false)}
                  icon={<Close />}
                />
              </Heading>
            </StyledTopBar>
            {Filters}
            <ApplyFilters>
              <ApplyFiltersButton
                iconLeft={fetching && <Spinner />}
                onClick={() => setShowFilter(false)}
                variant="primary"
              >
                {!fetching && `${totalCount} resultaten tonen`}
              </ApplyFiltersButton>
            </ApplyFilters>
          </StyledModal>
=======
          <SearchPageFilters
            filters={filters}
            isOverviewPage={isOverviewPage}
            totalCount={totalCount}
            hideCount={!DATA_SEARCH_PAGES.includes(currentPage)}
            setShowFilter={setShowFilter}
            query={query}
            currentPage={currentPage}
            fetching={fetching}
            showFilter={showFilter}
          />

>>>>>>> Add pagination to the searchpages, deleted unused filed, refactored search results to be less confusing
          <SearchPageResults
            {...{
              query,
              errors,
              fetching: initialLoading,
              totalCount,
              results,
              currentPage,
              isOverviewPage,
              sort,
              page,
              setShowFilter,
              pageInfo,
            }}
          />
        </Row>
      </ContentContainer>
    </Container>
  )
}

export default memo(SearchPage)
