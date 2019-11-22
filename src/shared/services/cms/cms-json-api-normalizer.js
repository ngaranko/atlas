import normalize from 'json-api-normalize'

export const getType = type => type && type.replace('node--', '')

export const reformatJSONApiResults = normalizedData => {
  // In case of a Drupal collection resource the returned data will include several objects that need to be normalized
  if (normalizedData.field_items) {
    return normalizedData.field_items.map(item => {
      const { url: teaserImageUrl } = item.field_teaser_image
        ? item.field_teaser_image.field_media_image.uri
        : {}

      // Make sure the correct fields have data here to be used by useNormalizedCMSResults()
      return {
        ...normalizedData,
        ...item,
        type: getType(item.type),
        intro: item.field_intro,
        short_title: item.field_short_title,
        uuid: item.id,
        teaser_url: teaserImageUrl,
      }
    })
  }

  // When a single Drupal resource has been requested return different normalized results
  const { url: coverImageUrl } = normalizedData.field_cover_image
    ? normalizedData.field_cover_image.field_media_image.uri
    : {}

  return {
    ...normalizedData,
    type: getType(normalizedData.type),
    uuid: normalizedData.id,
    media_image_url: coverImageUrl,
    intro: normalizedData.field_intro,
    body: normalizedData.body,
  }
}

const cmsJsonApiNormalizer = (data, fields) => {
  const normalizedData = normalize(data).get(['id', 'title', 'body', 'created', 'type', ...fields])

  return reformatJSONApiResults(normalizedData)
}

export default cmsJsonApiNormalizer
