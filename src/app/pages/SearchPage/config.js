import PAGES from '../../pages'
import {
  articleSearchQuery,
  dataSearchQuery,
  datasetSearchQuery,
  publicationSearchQuery,
} from '../../components/QuerySearch/constants.config'

export const MAX_RESULTS = 50

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
