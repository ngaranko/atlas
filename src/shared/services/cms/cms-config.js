import SHARED_CONFIG from '../shared-config/shared-config'

const cmsConfig = {
  article: {
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/article?filter[drupal_internal__nid]=${id}&include=field_cover_image.field_media_image,field_downloads.field_file`,
    fields: ['field_downloads', 'field_links', 'field_byline', 'field_slug', 'field_intro'],
  },
  publication: {
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication?filter[drupal_internal__nid]=${id}&include=field_cover_image.field_media_image,field_file.field_media_file`,
    fields: [
      'field_file_size',
      'field_file_type',
      'field_publication_source',
      'field_publication_intro',
      'field_slug',
    ],
  },
  special: {
    endpoint: id =>
      `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?filter[drupal_internal__nid]=${id}`,
    fields: ['field_iframe_link', 'field_slug'],
  },
}

export default cmsConfig
