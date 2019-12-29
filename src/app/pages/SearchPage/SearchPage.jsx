import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { breakpoint, Column, Container, Row, themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import PageFilterBox from '../../components/PageFilterBox/PageFilterBox'
import PAGES from '../../pages'
import SEARCH_PAGE_CONFIG, { DATA_FILTERS } from './config'
import SearchPageResults from './SearchPageResults'
import usePagination from '../../utils/usePagination'
import SearchPageFilters from './SearchPageFilters'

const FilterColumn = styled(Column)`
  align-content: flex-start;

  // Todo: style mobile filter column
  // @media screen and ${breakpoint('max-width', 'laptop')} {
  //   display: none;
  //   position: fixed;
  //   overflow-y: auto;
  //   width: calc(100% - ${themeSpacing(10)});
  //   max-width: 300px;
  //   bottom: 0;
  //   top: 75px;
  //   right: ${themeSpacing(5)};
  //   background-color: white;
  //   z-index: 30;
  // }
`

const DEFAULT_LIMIT = 10

const SearchPage = ({ query, activeFilters, currentPage, isOverviewPage }) => {
  const [extraQuery, setExtraQuery] = useState({})
  const [showLoadMore, setShowLoadMore] = useState(false)

  const from = 0

  const {
    fetching,
    error,
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
      case PAGES.ARTICLE_SEARCH:
      case PAGES.SPECIAL_SEARCH:
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

  return (
    <Container>
      <ContentContainer>
        <Row>
          <FilterColumn wrap span={{ small: 0, medium: 0, big: 0, large: 4, xLarge: 3 }}>
            {!isOverviewPage && <PageFilterBox currentPage={currentPage} query={query} />}
            <SearchPageFilters {...{ currentPage, filters, totalCount, query }} />
          </FilterColumn>
          <SearchPageResults
            {...{
              error,
              fetching,
              totalCount,
              results,
              currentPage,
              isOverviewPage,
              hasMore,
              fetchingMore,
              fetchMore,
              showLoadMore,
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
