import React from 'react'
import { FilterOption } from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import {
  toArticleSearch,
  toDataSearch,
  toDatasetSearch,
  toPublicationSearch,
  toSearch,
} from '../../../store/redux-first-router/actions'
import FilterBox from '../../components/FilterBox'
import PAGES from '../../pages'

export default ({ currentPage }) => (
  <FilterBox label="Filters">
    <FilterOption $as={RouterLink} active={currentPage === PAGES.SEARCH} to={toSearch()}>
      Alles
    </FilterOption>
    <FilterOption
      $as={RouterLink}
      active={currentPage === PAGES.DATA_SEARCH_QUERY}
      to={toDataSearch()}
    >
      Data
    </FilterOption>
    <FilterOption
      $as={RouterLink}
      active={currentPage === PAGES.PUBLICATION_SEARCH}
      to={toPublicationSearch()}
    >
      Publicaties
    </FilterOption>
    <FilterOption
      $as={RouterLink}
      active={currentPage === PAGES.DATASET_SEARCH}
      to={toDatasetSearch()}
    >
      Datasets
    </FilterOption>
    <FilterOption
      $as={RouterLink}
      active={currentPage === PAGES.ARTICLE_SEARCH}
      to={toArticleSearch()}
    >
      Artikelen
    </FilterOption>
  </FilterBox>
)
