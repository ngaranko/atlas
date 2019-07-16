import normalize from 'json-api-normalize'
import { dateToString } from '../../shared/services/date-formatter/date-formatter'

// eslint-disable-next-line import/prefer-default-export
export const normalizeArticleData = data => {
  const {
    title,
    body,
    field_image: image,
    field_downloads: downloads,
    field_links: links,
    field_byline: byline,
    field_slug: slug,
    field_intro: intro,
    field_publication_date: pubDate,
  } = normalize(data).get([
    'title',
    'body',
    'field_image.uri',
    'field_downloads.title',
    'field_downloads.drupal_internal__nid',
    'field_downloads.field_file_type',
    'field_downloads.field_file_size',
    'field_downloads.field_publication_file.uri',
    'field_links',
    'field_byline',
    'field_slug',
    'field_intro',
    'field_publication_date',
  ])[0]
  const publicationDate = new Date(pubDate)
  const date = dateToString(publicationDate)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const localeDate = publicationDate.toLocaleDateString('nl-NL', options)

  return {
    title,
    slug,
    intro,
    date,
    localeDate,
    body: body.value,
    image,
    downloads,
    links,
    byline,
  }
}
