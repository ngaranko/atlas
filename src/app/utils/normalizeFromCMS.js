import normalize from 'json-api-normalize'
import formatDate, { dateToString } from '../../shared/services/date-formatter/date-formatter'

// eslint-disable-next-line import/prefer-default-export
const normalizeFromCMS = (data, fields) => {
  // const fields = [
  //   'field_image',
  //   'field_downloads',
  //   'field_links',
  //   'field_byline',
  //   'field_slug',
  //   'field_intro'
  // ]

  const { title, body, created, ...otherFields } = normalize(data).get([
    'title',
    'body',
    'created',
    ...fields,
  ])[0]

  const publicationDate = new Date(created)
  const date = dateToString(publicationDate)
  const localeDate = formatDate(publicationDate)

  const coverUrl = data.included ? data.included[1].attributes.uri.url : {}

  return {
    title,
    date,
    localeDate,
    body: body.value,
    coverUrl,
    included: data.included,
    ...otherFields
  }
}

export default normalizeFromCMS

// export const normalizePublicationData = (data) => {
//   const normalizedData = normalizeData(data, ['field_file_size', 'field_file_type', 'field_publication_source', 'field_publication_intro', 'field_slug'])
//   const { title, body, created, ...otherFields } = normalize(data).get([
//     'title',
//     'body',
//     'created',
//     ...fields,
//   ])[0]

//   const publicationDate = new Date(created)
//   const date = dateToString(publicationDate)
//   const localeDate = formatDate(publicationDate)

//   return {
//     title,
//     date,
//     localeDate,
//     body: body.value,
//     ...otherFields
//   }
// }
