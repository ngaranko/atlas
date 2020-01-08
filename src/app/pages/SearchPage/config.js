import {
  articleSearchQuery,
  dataSearchQuery,
  datasetSearchQuery,
  publicationSearchQuery,
  specialSearchQuery,
  searchQuery,
} from './graphql.config'
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

export const MAX_RESULTS = 50
export const DEFAULT_LIMIT = 10

export const DATA_FILTERS = 'dataTypes'

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

export default {
  [routing.search.page]: {
    resolver: Object.values(QUERY_TYPES),
    to: toSearch,
    query: searchQuery,
    label: routing.search.title,
  },
  [routing.publicationSearch.page]: {
    resolver: QUERY_TYPES[routing.publicationSearch.page],
    query: publicationSearchQuery,
    to: toPublicationSearch,
    label: routing.publications.title,
  },
  [routing.publications.page]: {
    resolver: QUERY_TYPES[routing.publicationSearch.page],
    query: publicationSearchQuery,
    to: toPublications,
    label: routing.publications.title,
  },
  [routing.articleSearch.page]: {
    resolver: QUERY_TYPES[routing.articleSearch.page],
    query: articleSearchQuery,
    to: toArticleSearch,
    label: routing.articles.title,
  },
  [routing.articles.page]: {
    resolver: QUERY_TYPES[routing.articleSearch.page],
    query: articleSearchQuery,
    to: toArticles,
    label: routing.articles.title,
  },
  [routing.specialSearch.page]: {
    resolver: QUERY_TYPES[routing.specialSearch.page],
    query: specialSearchQuery,
    to: toSpecialSearch,
    label: routing.specials.title,
  },
  [routing.specials.page]: {
    resolver: QUERY_TYPES[routing.specialSearch.page],
    query: specialSearchQuery,
    to: toSpecials,
    label: routing.specials.title,
  },
  [routing.dataSearch.page]: {
    resolver: QUERY_TYPES[routing.dataSearch.page],
    query: dataSearchQuery,
    to: toDataSearch,
    label: routing.data.title,
  },
  [routing.datasetSearch.page]: {
    resolver: QUERY_TYPES[routing.datasetSearch.page],
    query: datasetSearchQuery,
    to: toDatasetSearch,
    label: routing.datasets.title,
  },
  [routing.datasets.page]: {
    resolver: QUERY_TYPES[routing.datasetSearch.page],
    query: datasetSearchQuery,
    to: toDatasets,
    label: routing.datasets.title,
  },
}
