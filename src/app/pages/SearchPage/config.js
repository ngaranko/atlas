import PAGES from '../../pages'
import {
  articleSearchQuery,
  dataSearchQuery,
  datasetSearchQuery,
  publicationSearchQuery,
  specialSearchQuery,
  searchQuery,
} from './graphql.config'

export const MAX_RESULTS = 50

export const DATA_FILTERS = 'dataTypes'

export const QUERY_TYPES = {
  [PAGES.PUBLICATION_SEARCH]: 'publicationSearch',
  [PAGES.ARTICLE_SEARCH]: 'articleSearch',
  [PAGES.SPECIAL_SEARCH]: 'specialSearch',
  [PAGES.DATA_SEARCH]: 'dataSearch',
  [PAGES.DATASET_SEARCH]: 'datasetSearch',
}

export default {
  [PAGES.SEARCH]: {
    resolver: Object.values(QUERY_TYPES),
    query: searchQuery,
    label: 'Alles',
  },
  [PAGES.PUBLICATION_SEARCH]: {
    resolver: QUERY_TYPES[PAGES.PUBLICATION_SEARCH],
    query: publicationSearchQuery,
    label: 'Publicaties',
  },
  [PAGES.ARTICLE_SEARCH]: {
    resolver: QUERY_TYPES[PAGES.ARTICLE_SEARCH],
    query: articleSearchQuery,
    label: 'Artikelen',
  },
  [PAGES.SPECIAL_SEARCH]: {
    resolver: QUERY_TYPES[PAGES.SPECIAL_SEARCH],
    query: specialSearchQuery,
    label: 'In Beeld',
  },
  [PAGES.DATA_SEARCH]: {
    resolver: QUERY_TYPES[PAGES.DATA_SEARCH],
    query: dataSearchQuery,
    label: 'Data',
  },
  [PAGES.DATASET_SEARCH]: {
    resolver: QUERY_TYPES[PAGES.DATASET_SEARCH],
    query: datasetSearchQuery,
    label: 'Datasets',
  },
}
