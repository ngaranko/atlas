import normalize from 'json-api-normalize'
import formatDate, { dateToString } from '../date-formatter/date-formatter'

const cmsNormalizer = (data, fields) => {
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
    ...otherFields,
  }
}

export default cmsNormalizer
