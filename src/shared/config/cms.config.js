import SHARED_CONFIG from '../services/shared-config/shared-config'
import PAGES from '../../app/pages'
import ENVIRONMENT, { ENVIRONMENTS } from '../environment'

const SHARED_FIELDS = ['field_intro', 'field_cover_image.field_media_image.uri']

const cmsConfig = {
  ARTICLE: {
    type: PAGES.ARTICLES,
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
    type: PAGES.ARTICLES,
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/article`,
  },
  PUBLICATION: {
    type: PAGES.PUBLICATIONS,
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
    type: PAGES.PUBLICATIONS,
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/publication`,
  },
  SPECIAL: {
    type: PAGES.SPECIALS,
    endpoint: id => `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special/${id}`,
    fields: ['field_iframe_link', 'field_special_type'],
  },
  SPECIALS: {
    type: PAGES.SPECIALS,
    endpoint: () => `${SHARED_CONFIG.API_ROOT}cms_search/search/special`,
  },
  HOME_SPECIALS: {
    type: PAGES.SPECIALS,
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/9adfc6ee-a3ff-4632-ba75-86834bac5e92?include=field_items.field_teaser_image.field_media_image&sort=-created`,
    fields: [
      'field_items.id',
      'field_items.title',
      'field_items.intro',
      'field_items.field_short_title',
      'field_items.field_teaser_image.field_media_image.uri',
      'field_items.field_special_type',
      'field_items.field_teaser',
    ],
  },
  HOME_ORGANIZATION: {
    type: PAGES.ARTICLES,
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/d1500833-cdac-4e4b-9914-a67f1fbaccbe?include=field_items&sort=-created`,
    fields: [
      'field_items.id',
      'field_items.title',
      'field_items.intro',
      'field_items.field_short_title',
      'field_items.field_teaser',
      'field_items.field_link',
    ],
  },
  HOME_ABOUT: {
    type: PAGES.ARTICLES,
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/bb27218f-8fa3-40cc-8c23-8aae8eab445d?include=field_items&sort=-created`,
    fields: [
      'field_items.id',
      'field_items.title',
      'field_items.intro',
      'field_items.field_short_title',
      'field_items.field_teaser',
    ],
  },
  HOME_ABOUT_DATA: {
    type: PAGES.ARTICLES,
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/d9f076f2-74e6-4f5c-94c1-d95f2be1f2e0?include=field_items&sort=-created`,
    fields: [
      'field_items.id',
      'field_items.title',
      'field_items.intro',
      'field_items.field_short_title',
      'field_items.field_teaser',
    ],
  },
  HOME_HIGHLIGHT: {
    type: PAGES.ARTICLES,
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/list/fffa0199-9a9a-4cce-86c4-7fe7bfed21a0?include=field_items.field_teaser_image.field_media_image&sort=-created`,
    fields: [
      'field_items.id',
      'field_items.title',
      'field_items.intro',
      'field_items.field_short_title',
      'field_items.field_teaser_image.field_media_image.uri',
      'field_items.field_special_type',
      'field_items.field_teaser',
    ],
  },
}

export const AMSTERDAM_AND_DATA = 'amsterdam-en-data'
export const RESOURCES = 'bronnen'
export const DESCRIPTION_USAGE = 'wat-kun-je-hier'
export const FAQ = 'veelgestelde-vragen'
export const ABOUT_OIS = 'over-ois'
export const RESEARCH_BY_OIS = 'onderzoek-door-ois'
export const DATA_IN_TABLES = 'tabellen'
export const HELP = 'help'
export const CONTACT = 'contact'
export const ABOUT_SITE = 'over-deze-site'

const cmsIdListAcc = {
  [DESCRIPTION_USAGE]: '5a962d67-ae2d-41b5-9c1a-263591eb5b0c',
  [ABOUT_OIS]: '4dba60f2-7161-4fd8-81e9-03eddb52d259',
  [AMSTERDAM_AND_DATA]: '29160257-dd4b-4349-a5df-d6f7715615ed',
  [RESOURCES]: 'e3bd02bc-ce8a-4ff3-8d2c-4d5138ef0115',
  [RESEARCH_BY_OIS]: 'bd25761c-ca8c-4587-bdd8-6f77bd8bd7e3',
  [FAQ]: 'a939afed-ff98-4db1-a927-fe6c9bac1ae6',
  [DATA_IN_TABLES]: '647c0fd0-567e-4157-b7ee-94c7b8504235',
  [HELP]: '4e5af47c-a67f-4cbc-be3c-7a0f410a45d6',
  [CONTACT]: 'aadfea20-7308-4caf-9126-a900f9e6df1f',
  [ABOUT_SITE]: '6b474539-32fb-4a1c-929a-bbfefadadc08',
}

const cmsIdListProd = {
  [DESCRIPTION_USAGE]: '5a962d67-ae2d-41b5-9c1a-263591eb5b0c',
  [ABOUT_OIS]: '8cf61560-0f90-4b81-84bf-900a6755159d',
  [AMSTERDAM_AND_DATA]: '8af0598f-12a0-47c5-9327-938fade1159a',
  [RESOURCES]: '6f095138-5e73-4388-8300-489270fdd60a',
  [RESEARCH_BY_OIS]: '3d7c706a-0898-4adc-b0e8-2c4c195ed7f9',
  [FAQ]: 'a939afed-ff98-4db1-a927-fe6c9bac1ae6',
  [DATA_IN_TABLES]: '3f5a9b94-a9d8-417d-aac8-45971f4b3a43',
  [HELP]: 'de7d3101-354c-44f6-b94d-dde572239090',
  [CONTACT]: 'c8f4d1da-75f3-4ee7-93e8-256b201d6ccf',
  [ABOUT_SITE]: 'a5176bed-cad4-46d2-b501-a628370c9099',
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
