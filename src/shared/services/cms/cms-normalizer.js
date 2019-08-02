import normalize from 'json-api-normalize'
import formatDate, { dateToString } from '../date-formatter/date-formatter'

const cmsNormalizer = (data, fields) => {
  const normalized = normalize(data)
    .get(['title', 'body', 'created', ...fields])
    .map(dataItem => {
      const {
        title,
        body,
        created,
        field_cover_image: coverImage,
        field_file: file,
        field_teaser_image: teaserImage,
        ...otherFields
      } = dataItem

      console.log(dataItem)

      const publicationDate = new Date(created)
      const date = dateToString(publicationDate)
      const localeDate = formatDate(publicationDate)

      const { url: coverImageUrl } = coverImage ? coverImage.field_media_image.uri : {}
      const { url: fileUrl } = file ? file.field_media_file.uri : {}
      const { url: teaserImageUrl } = teaserImage ? teaserImage.field_media_image.uri : {}

      return {
        title,
        date,
        localeDate,
        body: body && body.value,
        coverImageUrl,
        fileUrl,
        teaserImageUrl,
        included: data.included,
        ...otherFields,
      }
    })

  console.log(normalized)

  return normalized
}

export default cmsNormalizer
