import React from 'react'
import EditorialResults from '../../components/EditorialResults'
import SEARCH_PAGE_CONFIG, {
  EDITORIAL_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  DATA_SEARCH_PAGES,
} from './config'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'

const SearchResultsComponent = ({ page, ...props }) => {
  if (EDITORIAL_SEARCH_PAGES.includes(page)) {
    const { label, type } = SEARCH_PAGE_CONFIG[page]

    return (
      <EditorialResults
        data-test={page}
        {...{
          ...props,
          label,
          type,
        }}
      />
    )
  }

  if (DATASET_SEARCH_PAGES.includes(page)) {
    return (
      <DatasetSearchResults
        data-test={page}
        {...{ ...props, label: SEARCH_PAGE_CONFIG[page].label }}
      />
    )
  }

  if (DATA_SEARCH_PAGES.includes(page)) {
    return (
      <DataSearchResults
        data-test={page}
        {...{ ...props, label: SEARCH_PAGE_CONFIG[page].label }}
      />
    )
  }

  return <></>
}

export default SearchResultsComponent
