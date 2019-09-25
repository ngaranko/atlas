import SHARED_CONFIG from '../shared-config/shared-config'
import ENVIRONMENT, { ENVIRONMENTS } from '../../environment'

const cmsConfig = {
  ARTICLE: {
    type: 'article',
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/article/${id}?include=field_cover_image.field_media_image,field_downloads.field_file.field_media_file`,
    fields: [
      'field_cover_image.field_media_image.uri',
      'field_downloads',
      'field_downloads.title',
      'field_downloads.drupal_internal__nid',
      'field_downloads.field_file_type',
      'field_downloads.field_file_size',
      'field_downloads.field_file.field_media_file.uri',
      'field_links',
      'field_byline',
      'field_slug',
      'field_intro',
      'field_publication_date',
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
      'field_cover_image.field_media_image.uri',
      'field_file.field_media_file.uri',
      'field_file_size',
      'field_file_type',
      'field_publication_source',
      'field_intro',
      'field_slug',
      'field_publication_year',
      'field_publication_month',
      'field_publication_day',
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
export const BRONNEN = 'bronnen'
export const WAT_KUN_JE_HIER = 'wat-kun-je-hier'
export const VEELGESTELDE_VRAGEN = 'veelgestelde-vragen'
export const OVER_OIS = 'over-ois'
export const ONDERZOEK_DOOR_OIS = 'onderzoek-door-ois'

const cmsIdListAcc = {
  [AMSTERDAM_EN_DATA]: '29160257-dd4b-4349-a5df-d6f7715615ed',
  [BRONNEN]: 'e3bd02bc-ce8a-4ff3-8d2c-4d5138ef0115',
  [WAT_KUN_JE_HIER]: 'e1704036-dcda-4cac-ba87-732d5dc45855',
  [VEELGESTELDE_VRAGEN]: 'a939afed-ff98-4db1-a927-fe6c9bac1ae6',
  [OVER_OIS]: '4dba60f2-7161-4fd8-81e9-03eddb52d259',
  [ONDERZOEK_DOOR_OIS]: 'bd25761c-ca8c-4587-bdd8-6f77bd8bd7e3',
}

const cmsIdListProd = {
  [AMSTERDAM_EN_DATA]: '29160257-dd4b-4349-a5df-d6f7715615ed',
  [BRONNEN]: 'e3bd02bc-ce8a-4ff3-8d2c-4d5138ef0115',
  [WAT_KUN_JE_HIER]: 'e1704036-dcda-4cac-ba87-732d5dc45855',
  [VEELGESTELDE_VRAGEN]: 'a939afed-ff98-4db1-a927-fe6c9bac1ae6',
  [OVER_OIS]: '4dba60f2-7161-4fd8-81e9-03eddb52d259',
  [ONDERZOEK_DOOR_OIS]: 'bd25761c-ca8c-4587-bdd8-6f77bd8bd7e3',
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
