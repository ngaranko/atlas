import React from 'react'
import get from 'lodash.get'
import PAGES from '../../pages'
import SearchFilters from '../../components/SearchFilters/SearchFiltersContainer'
import { DATA_FILTERS } from './config'
import DatasetFilters from '../../components/SearchFilters/DatasetFilters'

/* istanbul ignore next */
const SearchPageFilters = ({ currentPage, filters, totalCount, query }) => {
  switch (currentPage) {
    case PAGES.DATA_SEARCH: {
      const options = get(filters, '[0].options')
      return options ? (
        <SearchFilters
          availableFilters={{
            label: 'Soort data',
            totalCount,
            filterType: 'string',
            options,
            type: DATA_FILTERS,
          }}
        />
      ) : null
    }

    case PAGES.DATASET_SEARCH:
      return <DatasetFilters q={query} />

    case PAGES.PUBLICATION_SEARCH:
    case PAGES.PUBLICATIONS:
    case PAGES.ARTICLE_SEARCH:
    case PAGES.ARTICLES:
    case PAGES.SPECIAL_SEARCH:
    case PAGES.SPECIALS:
      return filters && filters.length > 0 ? (
        <>
          {filters.map(filter => (
            <SearchFilters
              hideCount
              availableFilters={filter}
              type={filter.type}
              key={filter.type}
            />
          ))}
        </>
      ) : (
        <></>
      )

    default:
      return null
  }
}

export default SearchPageFilters
