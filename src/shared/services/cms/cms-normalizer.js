import normalize from 'json-api-normalize'
import formatDate, { dateToString } from '../date-formatter/date-formatter'
import SHARED_CONFIG from '../shared-config/shared-config'

const normalizeDataObject = (dataItem, type = '') => {
  const {
    id,
    title,
    body,
    field_publication_date: publicationDate,
    field_cover_image: coverImage,
    field_file: file,
    field_teaser_image: teaserImage,
    ...otherFields
  } = dataItem

  let formattedDate
  let localeDate
  // publications follow a different pattern for constructing the localeDate
  if (type === 'publication') {
    const {
      field_publication_year: year,
      field_publication_month: month,
      field_publication_day: day,
    } = otherFields || {}

    // eslint-disable-next-line no-nested-ternary
    const combinedDate = (year, month, day)
      ? `${year}, ${month}, ${day}`
      : (year, month)
      ? `${year}, ${month}`
      : year

    formattedDate = new Date(combinedDate)
    localeDate = formatDate(formattedDate, !!day, !!month, !!year)
  } else {
    formattedDate = new Date(publicationDate)
    localeDate = formatDate(formattedDate)
  }

  const date = dateToString(formattedDate)

  const { url: coverImageUrl } = coverImage ? coverImage.field_media_image.uri : {}
  const { url: fileUrl } = file ? file.field_media_file.uri : {}
  const { url: teaserImageUrl } = teaserImage ? teaserImage.field_media_image.uri : {}

  return {
    id,
    title,
    date,
    localeDate,
    body: body && body.value,
    coverImageUrl: coverImageUrl ? `${SHARED_CONFIG.CMS_ROOT}${coverImageUrl}` : null,
    fileUrl: fileUrl ? `${SHARED_CONFIG.CMS_ROOT}${fileUrl}` : null,
    teaserImageUrl: teaserImageUrl ? `${SHARED_CONFIG.CMS_ROOT}${teaserImageUrl}` : null,
    ...otherFields,
  }
}

const cmsNormalizer = (type, data, fields) => {
  const normalizedData = normalize(data).get(['id', 'title', 'body', 'created', ...fields])

  // In case of a Drupal collection resource the returned data will include several objects that need to be normalized
  if (normalizedData.field_items) {
    console.log(normalizedData)

    return normalizedData.field_items.map((item, index) => ({
      ...normalizeDataObject(item),
      id: index,
    }))
  }

  return normalizeDataObject(normalizedData, type)
}

export default cmsNormalizer
