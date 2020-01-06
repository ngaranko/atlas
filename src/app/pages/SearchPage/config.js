import PAGES from '../../pages'
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
} from '../../../store/redux-first-router/actions'
import { routing } from '../../routes'

export const MAX_RESULTS = 50
export const DEFAULT_LIMIT = 10

export const DATA_FILTERS = 'dataTypes'

export const QUERY_TYPES = {
  [PAGES.SPECIAL_SEARCH]: 'specialSearch',
  [PAGES.DATA_SEARCH]: 'dataSearch',
  [PAGES.PUBLICATION_SEARCH]: 'publicationSearch',
  [PAGES.DATASET_SEARCH]: 'datasetSearch',
  [PAGES.ARTICLE_SEARCH]: 'articleSearch',
}

export default {
  [routing.search.page]: {
    resolver: Object.values(QUERY_TYPES),
    to: toSearch,
    query: searchQuery,
    label: routing.search.title,
  },
  [routing.publicationSearch.page]: {
    resolver: QUERY_TYPES[PAGES.PUBLICATION_SEARCH],
    query: publicationSearchQuery,
    to: toPublicationSearch,
    label: routing.publications.title,
  },
  [routing.publications.page]: {
    resolver: QUERY_TYPES[PAGES.PUBLICATION_SEARCH],
    query: publicationSearchQuery,
    to: toPublications,
    label: routing.publications.title,
  },
  [routing.articleSearch.page]: {
    resolver: QUERY_TYPES[PAGES.ARTICLE_SEARCH],
    query: articleSearchQuery,
    to: toArticleSearch,
    label: routing.articles.title,
  },
  [routing.articles.page]: {
    resolver: QUERY_TYPES[PAGES.ARTICLE_SEARCH],
    query: articleSearchQuery,
    to: toArticles,
    label: routing.articles.title,
  },
  [routing.specialSearch.page]: {
    resolver: QUERY_TYPES[PAGES.SPECIAL_SEARCH],
    query: specialSearchQuery,
    to: toSpecialSearch,
    label: routing.specials.title,
  },
  [routing.specials.page]: {
    resolver: QUERY_TYPES[PAGES.SPECIAL_SEARCH],
    query: specialSearchQuery,
    to: toSpecials,
    label: routing.specials.title,
  },
  [routing.dataSearch.page]: {
    resolver: QUERY_TYPES[PAGES.DATA_SEARCH],
    query: dataSearchQuery,
    to: toDataSearch,
    label: routing.data.title,
  },
  [routing.datasetSearch.page]: {
    resolver: QUERY_TYPES[PAGES.DATASET_SEARCH],
    query: datasetSearchQuery,
    to: toDatasetSearch,
    label: routing.datasets.title,
  },
}
