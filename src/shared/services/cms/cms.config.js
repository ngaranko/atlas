import SHARED_CONFIG from '../shared-config/shared-config'

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

export default cmsConfig
