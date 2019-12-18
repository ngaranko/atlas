import PAGES from '../../pages'
import {
  articleSearchQuery,
  dataSearchQuery,
  datasetSearchQuery,
  publicationSearchQuery,
  specialSearchQuery,
} from './graphql.config'

export const MAX_RESULTS = 50

export const DATA_FILTERS = 'dataTypes'

export const TYPES = {
  ARTICLE: 'article',
  PUBLICATION: 'publication',
  SPECIAL: 'special',
}

export default {
  [PAGES.SEARCH]: {
    resolver: 'publicationSearch',
    query: publicationSearchQuery,
    label: 'Alles',
  },
  [PAGES.PUBLICATION_SEARCH]: {
    resolver: 'publicationSearch',
    query: publicationSearchQuery,
    label: 'Publicaties',
  },
  [PAGES.ARTICLE_SEARCH]: {
    resolver: 'articleSearch',
    query: articleSearchQuery,
    label: 'Artikelen',
  },
  [PAGES.SPECIAL_SEARCH]: {
    resolver: 'specialSearch',
    query: specialSearchQuery,
    label: 'In Beeld',
  },
  [PAGES.DATA_SEARCH_QUERY]: {
    resolver: 'dataSearch',
    query: dataSearchQuery,
    label: 'Data',
  },
  [PAGES.DATASET_SEARCH]: {
    resolver: 'datasetSearch',
    query: datasetSearchQuery,
    label: 'Datasets',
  },
}
