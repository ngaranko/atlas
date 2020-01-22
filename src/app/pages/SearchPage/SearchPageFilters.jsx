import React from 'react'
import get from 'lodash.get'
import SearchFilters from '../../components/SearchFilters'
import {
  DATA_FILTERS,
  DATA_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  EDITORIAL_SEARCH_PAGES,
} from './config'
import DatasetFilters from '../../components/SearchFilters/DatasetFilters'
import EditorialFilters from '../../components/SearchFilters/EditorialFilters'

const SearchPageFilters = ({ currentPage, filters, totalCount, query }) => {
  if (DATA_SEARCH_PAGES.includes(currentPage)) {
    const options = get(filters, '[0].options')
    return options ? (
      <SearchFilters
        data-test={currentPage}
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

  if (DATASET_SEARCH_PAGES.includes(currentPage)) {
    return <DatasetFilters data-test={currentPage} q={query} />
  }

  if (EDITORIAL_SEARCH_PAGES.includes(currentPage)) {
    return <EditorialFilters data-test={currentPage} filters={filters} />
  }

  return null
}

export default SearchPageFilters
