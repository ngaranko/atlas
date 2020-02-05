import React, { memo, useEffect, useState } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { clearAllBodyScrollLocks, enableBodyScroll } from 'body-scroll-lock'
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
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import PageFilterBox from '../../components/PageFilterBox/PageFilterBox'
import SEARCH_PAGE_CONFIG, {
  DEFAULT_LIMIT,
  DATA_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  EDITORIAL_SEARCH_PAGES,
  DATA_FILTERS,
} from './config'
import SearchPageResults from './SearchPageResults'
import usePagination from '../../utils/usePagination'
import SearchPageFilters from './SearchPageFilters'
import useCompare from '../../utils/useCompare'
import useSelectors from '../../utils/useSelectors'
import { getActiveFilters, getSort } from './SearchPageDucks'
import useDocumentTitle from '../../utils/useDocumentTitle'

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

const StyledTopBar = styled(TopBar)`
  border-bottom: 2px solid ${themeColor('tint', 'level3')};
`

/* TODO: Write tests for the Hooks used in this component */
/* istanbul ignore next */
const SearchPage = ({ isOverviewPage, currentPage, query }) => {
  const [extraQuery, setExtraQuery] = useState({})
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [sort, activeFilters] = useSelectors([getSort, getActiveFilters])
  const from = 0
  const defaultSort = isOverviewPage ? 'date:desc' : ''

  const { documentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  useEffect(() => {
    if (documentTitle) {
      trackPageView({ documentTitle })
    }
  }, [documentTitle])

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
    {
      q: query,
      limit: DEFAULT_LIMIT,
      ...extraQuery,
    },
    sort || defaultSort,
    DEFAULT_LIMIT,
    from,
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

  useEffect(() => {
    const isSearchPage = [...EDITORIAL_SEARCH_PAGES, ...DATASET_SEARCH_PAGES].includes(currentPage)
    const isDataSearchPage = DATA_SEARCH_PAGES.includes(currentPage)

    if (isSearchPage) {
      setShowLoadMore(true)
      setExtraQuery({ filters: activeFilters })
    } else if (isDataSearchPage) {
      const activeDataFilter = activeFilters.find(filter => filter.type === DATA_FILTERS) || null

      setShowLoadMore(activeDataFilter !== null)
      setExtraQuery({ filters: activeFilters })
    } else {
      setExtraQuery({})
      setShowLoadMore(false)
    }
  }, [currentPage, activeFilters])

  const Filters = (
    <FilterColumn wrap span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}>
      {!isOverviewPage && <PageFilterBox {...{ query, currentPage }} />}
      <SearchPageFilters
        filters={filters}
        totalCount={totalCount}
        hideCount={!DATA_SEARCH_PAGES.includes(currentPage)}
      />
    </FilterColumn>
  )

  return (
    <Container>
      <ContentContainer>
        <Row>
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
          <SearchPageResults
            {...{
              query,
              errors,
              fetching,
              totalCount,
              results,
              currentPage,
              isOverviewPage,
              hasMore,
              fetchingMore,
              fetchMore,
              showLoadMore,
              sort,
              setShowFilter,
            }}
          />
        </Row>
      </ContentContainer>
    </Container>
  )
}

export default memo(SearchPage)
