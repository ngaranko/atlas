import normalize from 'json-api-normalize'
import formatDate, { dateToString } from '../date-formatter/date-formatter'
import SHARED_CONFIG from '../shared-config/shared-config'
import useNormalizedCMSResults from '../../../normalizations/cms/useNormalizedCMSResults'

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

  let localeDate
  let localeDateFormatted

  // publications follow a different pattern for constructing the localeDate
  if (type === 'publication') {
    const { field_publication_year: year, field_publication_month: month } = otherFields || {}

    localeDate = new Date(Date.UTC(year, month || 1, 1, 0, 0, 0))

    localeDateFormatted = formatDate(localeDate, false, !!month, !!year)
  } else {
    localeDate = new Date(publicationDate)
    localeDateFormatted = formatDate(localeDate)
  }

  const date = dateToString(localeDateFormatted)

  const { url: coverImageUrl } = coverImage ? coverImage.field_media_image.uri : {}
  const { url: fileUrl } = file ? file.field_media_file.uri : {}
  const { url: teaserImageUrl } = teaserImage ? teaserImage.field_media_image.uri : {}

  return {
    id,
    title,
    date,
    localeDate: localeDateFormatted,
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
    const aggregatedData = normalizedData.field_items.map(item => {
      const { url: teaserImageUrl } = item.field_teaser_image
        ? item.field_teaser_image.field_media_image.uri
        : {}

      // Make sure the correct fields have data here to be used by useNormalizedCMSResults()
      return {
        ...normalizedData,
        ...item,
        slug: item.field_slug,
        intro: item.field_intro,
        short_title: item.field_short_title,
        uuid: item.id,
        teaser_url: teaserImageUrl,
      }
    })
    const normalizedNew = useNormalizedCMSResults(aggregatedData, type)

    return normalizedNew
  }

  return normalizeDataObject(normalizedData, type)
}

export default cmsNormalizer
