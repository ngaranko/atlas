import normalize from 'json-api-normalize'
import formatDate, { dateToString } from '../date-formatter/date-formatter'
import SHARED_CONFIG from '../shared-config/shared-config'

const cmsNormalizer = (type, data, fields) => {
  const normalizedData = normalize(data)
    .get(['drupal_internal__nid', 'title', 'body', 'created', ...fields])
    .map(dataItem => {
      const {
        drupal_internal__nid: id,
        title,
        body,
        created,
        field_cover_image: coverImage,
        field_file: file,
        field_teaser_image: teaserImage,
        ...otherFields
      } = dataItem

      const createdData = new Date(created)
      const date = dateToString(createdData)

      let localeDate
      if (type === 'publication') {
        const {
          field_publication_year: year,
          field_publication_month: month,
          field_publication_day: day,
        } = otherFields || {}

        // eslint-disable-next-line no-nested-ternary
        localeDate = (year, month, day)
          ? `${day} ${month} ${year}`
          : (year, month)
          ? `${month} ${year}`
          : year
      } else {
        localeDate = formatDate(createdData)
      }

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
    })

  return {
    data: normalizedData,
    links: data.links,
  }
}

export default cmsNormalizer
