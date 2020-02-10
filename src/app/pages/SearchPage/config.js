import {
  dataSearchQuery,
  datasetSearchQuery,
  searchQuery,
  articleSearchQuery,
  publicationSearchQuery,
  specialSearchQuery,
} from './documents.graphql'

import {
  toSearch,
  toPublicationSearch,
  toArticleSearch,
  toSpecialSearch,
  toDataSearch,
  toDatasetSearch,
} from '../../../store/redux-first-router/actions'
import { routing } from '../../routes'
import { TYPES as EDITORIAL_TYPES } from '../../../shared/config/cms.config'
import EditorialResults from '../../components/EditorialResults'
import DataSearchResults from './DataSearchResults'
import DatasetSearchResults from './DatasetSearchResults'

export const MAX_RESULTS = 50
export const DEFAULT_LIMIT = 10

export const DATA_FILTERS = 'dataTypes'

export const TYPES = {
  SEARCH: 'search',
  DATA: 'data',
  DATASET: 'dataset',
}

export const QUERY_TYPES = {
  [routing.specialSearch.page]: 'specialSearch',
  [routing.dataSearch.page]: 'dataSearch',
  [routing.publicationSearch.page]: 'publicationSearch',
  [routing.datasetSearch.page]: 'datasetSearch',
  [routing.articleSearch.page]: 'articleSearch',
}

export const EDITORIAL_SEARCH_PAGES = [
  routing.publicationSearch.page,
  routing.specialSearch.page,
  routing.articleSearch.page,
]

export default {
  [routing.search.page]: {
    resolver: ['dataSearch', 'datasetSearch', 'articleSearch'],
    to: toSearch,
    query: searchQuery,
    label: routing.search.title,
    type: TYPES.SEARCH,
  },
  [routing.publicationSearch.page]: {
    resolver: QUERY_TYPES[routing.publicationSearch.page],
    query: publicationSearchQuery,
    to: toPublicationSearch,
    label: routing.publicationSearch.title,
    type: EDITORIAL_TYPES.PUBLICATION,
    component: EditorialResults,
  },
  [routing.articleSearch.page]: {
    resolver: QUERY_TYPES[routing.articleSearch.page],
    query: articleSearchQuery,
    to: toArticleSearch,
    label: routing.articleSearch.title,
    type: EDITORIAL_TYPES.ARTICLE,
    component: EditorialResults,
  },
  [routing.specialSearch.page]: {
    resolver: QUERY_TYPES[routing.specialSearch.page],
    query: specialSearchQuery,
    to: toSpecialSearch,
    label: routing.specialSearch.title,
    type: EDITORIAL_TYPES.SPECIAL,
    component: EditorialResults,
  },
  [routing.dataSearch.page]: {
    resolver: QUERY_TYPES[routing.dataSearch.page],
    query: dataSearchQuery,
    to: toDataSearch,
    label: routing.dataSearch.title,
    type: TYPES.DATA,
    component: DataSearchResults,
  },
  [routing.datasetSearch.page]: {
    resolver: QUERY_TYPES[routing.datasetSearch.page],
    query: datasetSearchQuery,
    to: toDatasetSearch,
    label: routing.datasetSearch.title,
    type: TYPES.DATASET,
    component: DatasetSearchResults,
  },
}
