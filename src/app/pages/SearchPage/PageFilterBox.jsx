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
import { routing } from '../../routes'

const ACTIVE_LINK_PROPS = { active: true, as: 'div' }

export default ({ currentPage }) => (
  <FilterBox label="Filters">
    <FilterOption
      {...(currentPage === PAGES.SEARCH
        ? ACTIVE_LINK_PROPS
        : { as: RouterLink, to: toSearch(), title: routing.search.title })}
    >
      Alles
    </FilterOption>
    <FilterOption
      {...(currentPage === PAGES.DATA_SEARCH_QUERY
        ? ACTIVE_LINK_PROPS
        : { as: RouterLink, to: toDataSearch(), title: routing.dataSearchQuery.title })}
    >
      Data
    </FilterOption>
    <FilterOption
      {...(currentPage === PAGES.PUBLICATION_SEARCH
        ? ACTIVE_LINK_PROPS
        : { as: RouterLink, to: toPublicationSearch(), title: routing.publicationSearch.title })}
    >
      Publicaties
    </FilterOption>
    <FilterOption
      {...(currentPage === PAGES.DATASET_SEARCH
        ? ACTIVE_LINK_PROPS
        : { as: RouterLink, to: toDatasetSearch(), title: routing.datasetSearch.title })}
    >
      Datasets
    </FilterOption>
    <FilterOption
      {...(currentPage === PAGES.ARTICLE_SEARCH
        ? ACTIVE_LINK_PROPS
        : { as: RouterLink, to: toArticleSearch(), title: routing.articleSearch.title })}
    >
      Artikelen
    </FilterOption>
  </FilterBox>
)
