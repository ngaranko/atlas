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
  toPublications,
  toArticles,
  toSpecials,
  toDatasets,
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
  routing.publications.page,
  routing.publicationSearch.page,
  routing.specials.page,
  routing.specialSearch.page,
  routing.articles.page,
  routing.articleSearch.page,
]

export const DATASET_SEARCH_PAGES = [routing.datasets.page, routing.datasetSearch.page]
export const DATA_SEARCH_PAGES = [routing.dataSearch.page]
export const CMS_SEARCH_PAGES = [
  routing.articleSearch.page,
  routing.specialSearch.page,
  routing.publicationSearch.page,
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
    label: routing.publications.title,
    type: EDITORIAL_TYPES.PUBLICATION,
    component: EditorialResults,
  },
  [routing.publications.page]: {
    resolver: QUERY_TYPES[routing.publicationSearch.page],
    query: publicationSearchQuery,
    to: toPublications,
    label: routing.publications.title,
    type: EDITORIAL_TYPES.PUBLICATION,
    component: EditorialResults,
  },
  [routing.articleSearch.page]: {
    resolver: QUERY_TYPES[routing.articleSearch.page],
    query: articleSearchQuery,
    to: toArticleSearch,
    label: routing.articles.title,
    type: EDITORIAL_TYPES.ARTICLE,
    component: EditorialResults,
  },
  [routing.articles.page]: {
    resolver: QUERY_TYPES[routing.articleSearch.page],
    query: articleSearchQuery,
    to: toArticles,
    label: routing.articles.title,
    type: EDITORIAL_TYPES.ARTICLE,
    component: EditorialResults,
  },
  [routing.specialSearch.page]: {
    resolver: QUERY_TYPES[routing.specialSearch.page],
    query: specialSearchQuery,
    to: toSpecialSearch,
    label: routing.specials.title,
    type: EDITORIAL_TYPES.SPECIAL,
    component: EditorialResults,
  },
  [routing.specials.page]: {
    resolver: QUERY_TYPES[routing.specialSearch.page],
    query: specialSearchQuery,
    to: toSpecials,
    label: routing.specials.title,
    type: EDITORIAL_TYPES.SPECIAL,
    component: EditorialResults,
  },
  [routing.dataSearch.page]: {
    resolver: QUERY_TYPES[routing.dataSearch.page],
    query: dataSearchQuery,
    to: toDataSearch,
    label: routing.data.title,
    type: TYPES.DATA,
    component: DataSearchResults,
  },
  [routing.datasetSearch.page]: {
    resolver: QUERY_TYPES[routing.datasetSearch.page],
    query: datasetSearchQuery,
    to: toDatasetSearch,
    label: routing.datasets.title,
    type: TYPES.DATASET,
    component: DatasetSearchResults,
  },
  [routing.datasets.page]: {
    resolver: QUERY_TYPES[routing.datasetSearch.page],
    query: datasetSearchQuery,
    to: toDatasets,
    label: routing.datasets.title,
    type: TYPES.DATASET,
    component: DatasetSearchResults,
  },
}
