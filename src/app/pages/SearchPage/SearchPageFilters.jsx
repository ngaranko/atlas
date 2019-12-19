import React from 'react'
import get from 'lodash.get'
import PAGES from '../../pages'
import SearchFilters from '../../components/SearchFilters/SearchFiltersContainer'
import { DATA_FILTERS } from './config'
import DatasetFilters from '../../components/SearchFilters/DatasetFilters'

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

    default:
      return null
  }
}

export default SearchPageFilters
