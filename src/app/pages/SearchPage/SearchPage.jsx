import React, { memo, useEffect, useState } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { clearAllBodyScrollLocks, enableBodyScroll } from 'body-scroll-lock'
import { Container, Row } from '@datapunt/asc-ui'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import SEARCH_PAGE_CONFIG, {
  DEFAULT_LIMIT,
  DATA_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  EDITORIAL_SEARCH_PAGES,
} from './config'
import SearchPageResults from './SearchPageResults'
import SearchPageFilters from './SearchPageFilters'
import useCompare from '../../utils/useCompare'
import useSelectors from '../../utils/useSelectors'
import { getActiveFilters, getSort, getPage } from './SearchPageDucks'
import useDocumentTitle from '../../utils/useDocumentTitle'
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
  const withPagination = isSearchPage || !!(isDataSearchPage && activeFilters.length > 0) || false

  useEffect(() => {
    if (documentTitle) {
      trackPageView({ documentTitle })
    }
  }, [documentTitle])

  const { fetching, errors, totalCount, filters, results, pageInfo } = usePagination(
    SEARCH_PAGE_CONFIG[currentPage].query,
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
