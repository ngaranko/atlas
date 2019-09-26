import SHARED_CONFIG from '../shared-config/shared-config'
import ENVIRONMENT, { ENVIRONMENTS } from '../../environment'

const SHARED_FIELDS = ['field_intro', 'field_slug', 'field_cover_image.field_media_image.uri']

const cmsConfig = {
  ARTICLE: {
    type: 'article',
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/article/${id}?include=field_cover_image.field_media_image,field_downloads.field_file.field_media_file`,
    fields: [
      'field_downloads',
      'field_downloads.title',
      'field_downloads.drupal_internal__nid',
      'field_downloads.field_file_type',
      'field_downloads.field_file_size',
      'field_downloads.field_file.field_media_file.uri',
      'field_links',
      'field_byline',
      'field_publication_date',
      'field_type',
      ...SHARED_FIELDS,
    ],
  },
  ARTICLES: {
    type: 'article',
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/article`,
  },
  PUBLICATION: {
    type: 'publication',
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication/${id}?include=field_cover_image.field_media_image,field_file.field_media_file`,
    fields: [
      'field_file.field_media_file.uri',
      'field_file_size',
      'field_file_type',
      'field_publication_source',
      'field_publication_year',
      'field_publication_month',
      'field_publication_day',
      ...SHARED_FIELDS,
    ],
  },
  PUBLICATIONS: {
    type: 'publication',
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/publication`,
  },
  SPECIAL: {
    type: 'special',
    endpoint: id => `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special/${id}`,
    fields: ['field_iframe_link', 'field_slug', 'field_special_type'],
  },
  SPECIALS: {
    type: 'special',
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/special`,
  },
}

export const AMSTERDAM_EN_DATA = 'amsterdam-en-data'
export const RESOURCES = 'bronnen'
export const WAT_KUN_JE_HIER = 'wat-kun-je-hier'
export const FAQ = 'veelgestelde-vragen'
export const OVER_OIS = 'over-ois'
export const ONDERZOEK_DOOR_OIS = 'onderzoek-door-ois'
export const DATA_IN_TABLES = 'tabellen'

const cmsIdListAcc = {
  [WAT_KUN_JE_HIER]: '5a962d67-ae2d-41b5-9c1a-263591eb5b0c',
  [OVER_OIS]: '4dba60f2-7161-4fd8-81e9-03eddb52d259',
  [AMSTERDAM_EN_DATA]: '29160257-dd4b-4349-a5df-d6f7715615ed',
  [RESOURCES]: 'e3bd02bc-ce8a-4ff3-8d2c-4d5138ef0115',
  [ONDERZOEK_DOOR_OIS]: 'bd25761c-ca8c-4587-bdd8-6f77bd8bd7e3',
  [FAQ]: 'a939afed-ff98-4db1-a927-fe6c9bac1ae6',
  [DATA_IN_TABLES]: '647c0fd0-567e-4157-b7ee-94c7b8504235',
}

const cmsIdListProd = {
  [WAT_KUN_JE_HIER]: '5a962d67-ae2d-41b5-9c1a-263591eb5b0c',
  [OVER_OIS]: '8cf61560-0f90-4b81-84bf-900a6755159d',
  [AMSTERDAM_EN_DATA]: '8af0598f-12a0-47c5-9327-938fade1159a',
  [RESOURCES]: '6f095138-5e73-4388-8300-489270fdd60a',
  [ONDERZOEK_DOOR_OIS]: '3d7c706a-0898-4adc-b0e8-2c4c195ed7f9',
  [FAQ]: 'a939afed-ff98-4db1-a927-fe6c9bac1ae6',
  [DATA_IN_TABLES]: '3f5a9b94-a9d8-417d-aac8-45971f4b3a43',
}

const cmsIdList = {
  [ENVIRONMENTS.PRODUCTION]: {
    ...cmsIdListProd,
  },
  [ENVIRONMENTS.PRE_PRODUCTION]: {
    ...cmsIdListProd,
  },
  [ENVIRONMENTS.ACCEPTANCE]: {
    ...cmsIdListAcc,
  },
  [ENVIRONMENTS.DEVELOPMENT]: {
    ...cmsIdListAcc,
  },
}

export const cmsIds = { ...cmsIdList[ENVIRONMENT] }

export default cmsConfig
