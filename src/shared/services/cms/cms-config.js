import SHARED_CONFIG from '../shared-config/shared-config'

const cmsConfig = {
  ARTICLE: {
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/article?filter[drupal_internal__nid]=${id}&include=field_cover_image.field_media_image,field_downloads.field_file`,
    fields: [
      'field_cover_image.field_media_image.uri',
      'field_downloads',
      'field_links',
      'field_byline',
      'field_slug',
      'field_intro',
    ],
  },
  ARTICLES: {
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/article?include=field_teaser_image.field_media_image`,
    fields: ['field_teaser_image.field_media_image.uri', 'field_intro', 'field_slug'],
  },
  PUBLICATION: {
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication?filter[drupal_internal__nid]=${id}&include=field_cover_image.field_media_image,field_file.field_media_file`,
    fields: [
      'field_cover_image.field_media_image.uri',
      'field_file.field_media_file.uri',
      'field_file_size',
      'field_file_type',
      'field_publication_source',
      'field_publication_intro',
      'field_slug',
    ],
  },
  PUBLICATIONS: {
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication?include=field_teaser_image.field_media_image`,
    fields: ['field_teaser_image.field_media_image.uri', 'field_publication_intro', 'field_slug'],
  },
  SPECIAL: {
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?filter[drupal_internal__nid]=${id}`,
    fields: ['field_iframe_link', 'field_slug', 'field_special_type'],
  },
  SPECIALS: {
    endpoint: () =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?include=field_teaser_image.field_media_image`,
    fields: ['field_teaser_image.field_media_image.uri', 'field_slug', 'field_special_type'],
  },
}

export default cmsConfig
