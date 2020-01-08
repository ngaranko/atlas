import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { clearAllBodyScrollLocks, enableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6'
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
  constants,
} from '@datapunt/asc-ui'
import styled, { css } from '@datapunt/asc-core'
import { Close } from '@datapunt/asc-assets'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import PageFilterBox from '../../components/PageFilterBox/PageFilterBox'
import PAGES from '../../pages'
import SEARCH_PAGE_CONFIG, { DEFAULT_LIMIT, DATA_FILTERS } from './config'
import SearchPageResults from './SearchPageResults'
import usePagination from '../../utils/usePagination'
import SearchPageFilters from './SearchPageFilters'
import useCompare from '../../utils/useCompare'

const FILTER_COLUMN_MAX_WIDTH = '400px'

const FilterColumn = styled(Column)`
  align-content: flex-start;

  @media screen and ${breakpoint('max-width', 'laptop')} {
    display: none;
    position: fixed;
    overflow-y: auto;
    width: calc(100% - ${themeSpacing(10)});
    max-width: ${FILTER_COLUMN_MAX_WIDTH};
    top: ${constants.HEADER_HEIGHT_SMALL}px;
    left: 0;
    right: ${themeSpacing(5)};
    background-color: white;
    z-index: 30;

    ${({ show }) =>
      show &&
      css`
        display: block;
      `}
  }
`

const StyledModal = styled(Modal)`
  @media screen and ${breakpoint('min-width', 'mobileL')} {
    width: calc(100% - 40px);
    max-width: calc(${FILTER_COLUMN_MAX_WIDTH} + ${themeSpacing(12)});
  }

  ${FilterColumn} {
    top: 0;
    width: 100%;
    position: relative;
    margin: auto auto ${themeSpacing(20)};
  }

  [role='dialog'] {
    position: relative;
    top: ${constants.HEADER_HEIGHT_SMALL}px;
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
  bottom: 50px;
  left: 0;
  z-index: 30; // Todo: implement better z-index strategy
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${themeSpacing(4)};
  background-color: #fff;
  box-shadow: 0 0 ${themeSpacing(2)} 1px black;
`

const ApplyFiltersButton = styled(Button)`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`

const SearchPage = ({ query, activeFilters, currentPage, isOverviewPage }) => {
  const [extraQuery, setExtraQuery] = useState({})
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [showFilter, setShowFilter] = React.useState(false)

  const from = 0

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
    switch (currentPage) {
      case PAGES.DATA_SEARCH:
        {
          const types = get(activeFilters.find(({ type }) => type === DATA_FILTERS), 'values', null)
          setExtraQuery({
            types,
          })

          setShowLoadMore(!!types)
        }
        break

      case PAGES.DATASET_SEARCH:
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
        break

      case PAGES.PUBLICATION_SEARCH:
      case PAGES.PUBLICATIONS:
      case PAGES.ARTICLE_SEARCH:
      case PAGES.ARTICLES:
      case PAGES.SPECIAL_SEARCH:
      case PAGES.SPECIALS:
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
        break

      default:
        setShowLoadMore(false)
    }
  }, [currentPage, activeFilters])

  const Filters = (
    <FilterColumn
      show={showFilter}
      wrap
      span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}
    >
      {!isOverviewPage && <PageFilterBox currentPage={currentPage} query={query} />}
      <SearchPageFilters {...{ currentPage, filters, totalCount, query }} />
    </FilterColumn>
  )

  console.log(currentPage, results)

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
              setShowFilter,
            }}
          />
        </Row>
      </ContentContainer>
    </Container>
  )
}

SearchPage.propTypes = {
  query: PropTypes.string.isRequired,
}

export default memo(SearchPage)
