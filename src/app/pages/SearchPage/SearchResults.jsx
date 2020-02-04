import React from 'react'
import styled from '@datapunt/asc-core'
import { CardContainer, Card } from '@datapunt/asc-ui'
import EditorialResults from '../../components/EditorialResults'
import SEARCH_PAGE_CONFIG, {
  EDITORIAL_SEARCH_PAGES,
  DATASET_SEARCH_PAGES,
  DATA_SEARCH_PAGES,
} from './config'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'

const MAX_ITEMS = 5

const SearchResults = ({ page, ...props }) => {
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

const SkeletonCard = styled(Card)`
  min-height: 160px;
`

export const SearchResultsSkeleton = ({ page }) => {
  return (
    <CardContainer>
      {[...Array(MAX_ITEMS).keys()].map(index => (
        <SkeletonCard key={`${page}-${index}`} isLoading />
      ))}
    </CardContainer>
  )
}

export default SearchResults
