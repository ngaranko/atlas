import PAGES from '../../app/pages'

const { HOMEPAGE: HOMEPAGE_LINKS } = require('./content-links.json')

const SHARED_FIELDS = ['field_intro', 'field_cover_image.field_media_image.uri']

const cmsConfig = {
  ARTICLE: {
    type: PAGES.ARTICLES,
    endpoint: id =>
      `${process.env.CMS_ROOT}jsonapi/node/article/${id}?include=field_cover_image.field_media_image,field_downloads.field_file.field_media_file`,
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
    endpoint: () => `${process.env.API_ROOT}cms_search/search/article`,
  },
  PUBLICATION: {
    type: PAGES.PUBLICATIONS,
    endpoint: id =>
      `${process.env.CMS_ROOT}jsonapi/node/publication/${id}?include=field_cover_image.field_media_image,field_file.field_media_file`,
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
    endpoint: () => `${process.env.API_ROOT}cms_search/search/publication`,
  },
  SPECIAL: {
    type: PAGES.SPECIALS,
    endpoint: id => `${process.env.CMS_ROOT}jsonapi/node/special/${id}`,
    fields: ['field_iframe_link', 'field_special_type'],
  },
  SPECIALS: {
    type: PAGES.SPECIALS,
    endpoint: () => `${process.env.API_ROOT}cms_search/search/special`,
  },
  HOME_SPECIALS: {
    type: PAGES.SPECIALS,
    endpoint: () =>
      `${process.env.CMS_ROOT}jsonapi/node/list/${
        HOMEPAGE_LINKS.SPECIALS.id[process.env.NODE_ENV]
      }?include=field_items.field_teaser_image.field_media_image&sort=-created`,
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
      `${process.env.CMS_ROOT}jsonapi/node/list/${
        HOMEPAGE_LINKS.ORGANIZATION.id[process.env.NODE_ENV]
      }?include=field_items&sort=-created`,
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
      `${process.env.CMS_ROOT}jsonapi/node/list/${
        HOMEPAGE_LINKS.ABOUT.id[process.env.NODE_ENV]
      }?include=field_items&sort=-created`,
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
      `${process.env.CMS_ROOT}jsonapi/node/list/${
        HOMEPAGE_LINKS.ABOUT_DATA.id[process.env.NODE_ENV]
      }?include=field_items&sort=-created`,
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
      `${process.env.CMS_ROOT}jsonapi/node/list/${
        HOMEPAGE_LINKS.HIGHLIGHT.id[process.env.NODE_ENV]
      }?include=field_items.field_teaser_image.field_media_image&sort=-created`,
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

export default cmsConfig
