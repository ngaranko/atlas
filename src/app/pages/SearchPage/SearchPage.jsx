import React, { memo, useEffect, useState } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import get from 'lodash.get'
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
  styles,
  constants,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import { Close } from '@datapunt/asc-assets'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import PageFilterBox from '../../components/PageFilterBox/PageFilterBox'
import SEARCH_PAGE_CONFIG, {
  DEFAULT_LIMIT,
  DATA_FILTERS,
  DATA_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  EDITORIAL_SEARCH_PAGES,
} from './config'
import SearchPageResults from './SearchPageResults'
import usePagination from '../../utils/usePagination'
import SearchPageFilters from './SearchPageFilters'
import useCompare from '../../utils/useCompare'
import useSelectors from '../../utils/useSelectors'
import { getActiveFilters, getQuery, getSort } from './SearchPageDucks'
import useDocumentTitle from '../../utils/useDocumentTitle'

const FilterColumn = styled(Column)`
  align-content: flex-start;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
  }
`

const StyledModal = styled(Modal)`
  @media screen and ${breakpoint('min-width', 'mobileL')} {
    width: calc(100% - ${themeSpacing(10)});
    max-width: calc(400px + ${themeSpacing(12)});
  }

  ${FilterColumn} {
    top: 0;
    width: 100%;
    position: relative;
    margin-bottom: ${themeSpacing(20)};
    display: block;
    overflow-y: auto;
    left: 0;
    right: ${themeSpacing(5)};

    @media screen and ${breakpoint('max-width', 'mobileL')} {
      ${styles.FilterBoxStyle} {
        border-right: transparent;
        border-left: transparent;
      }
    }
    @media screen and ${breakpoint('min-width', 'mobileL')} {
      padding: 0 ${themeSpacing(5)};
    }
  }

  [role='dialog'] {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    top: ${constants.HEADER_HEIGHT_SMALL}px;
    height: 100vh;
    max-height: 100%;
    max-width: initial;
    left: 0;
    bottom: 0;
    transform: initial;
  }
`

const ModalCloseButton = styled(Button)`
  margin-left: auto;
`

const ApplyFilters = styled.div`
  position: sticky;
  bottom: ${constants.HEADER_HEIGHT_SMALL}px;
  left: 0;
  z-index: 30; // Todo: implement better z-index strategy
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${themeSpacing(4)};
  background-color: #fff;
  box-shadow: 0 0 ${themeSpacing(2)} 1px black;
  margin-top: auto;
`

const ApplyFiltersButton = styled(Button)`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`

/* TODO: Write tests for the Hooks used in this component */
/* istanbul ignore next */
const SearchPage = ({ isOverviewPage, currentPage }) => {
  const [extraQuery, setExtraQuery] = useState({})
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [query, sort, activeFilters] = useSelectors([getQuery, getSort, getActiveFilters])
  const from = 0
  const defaultSort = isOverviewPage ? 'date:desc' : ''

  const { documentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  useEffect(() => {
    if (documentTitle) {
      trackPageView({ documentTitle })
    }
  }, [documentTitle])

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
    // Always reset the filterboxes when currentPage or data has changed
    if (DATA_SEARCH_PAGES.includes(currentPage)) {
      const types = get(activeFilters.find(({ type }) => type === DATA_FILTERS), 'values', null)
      setExtraQuery({
        types,
      })

      setShowLoadMore(!!types)
    } else if (
      EDITORIAL_SEARCH_PAGES.includes(currentPage) ||
      DATASET_SEARCH_PAGES.includes(currentPage)
    ) {
      setShowLoadMore(true)
      setExtraQuery({
        filters:
          activeFilters.length > 0
            ? activeFilters.map(({ type, values }) => ({
                type,
                values: Array.isArray(values) ? values : [values],
                multiSelect: Array.isArray(values),
              }))
            : null,
      })
    } else {
      setExtraQuery({})
      setShowLoadMore(false)
    }
  }, [currentPage, activeFilters])

  const Filters = (
    <FilterColumn wrap span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}>
      {!isOverviewPage && <PageFilterBox {...{ query, currentPage }} />}
      <SearchPageFilters {...{ currentPage, filters, totalCount, query }} />
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
          >
            <TopBar>
              <Heading style={{ flexGrow: 1 }} as="h4">
                <ModalCloseButton
                  variant="blank"
                  type="button"
                  size={30}
                  onClick={() => setShowFilter(false)}
                  icon={<Close />}
                />
              </Heading>
            </TopBar>
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
