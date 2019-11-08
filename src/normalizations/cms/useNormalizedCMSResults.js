/* eslint-disable camelcase */
import RouterLink from 'redux-first-router-link'
import { EDITORIAL_DETAIL_ACTIONS } from '../../app/pages/EditorialOverviewPage/constants'
import useSlug from '../../app/utils/useSlug'
import formatDate from '../../shared/services/date-formatter/date-formatter'
import PAGES from '../../app/pages'
import { reformatJSONApiResults } from '../../shared/services/cms/cms-json-api-normalizer'

const normalizeObject = (data, type) => {
  const {
    uuid,
    title,
    body,
    teaser_url,
    short_title,
    field_teaser,
    intro,
    field_special_type,
    field_publication_date,
    field_publication_year,
    field_publication_month,
    field_file,
    media_image_url,
    field_link,
    field_related,
    ...otherFields
  } = data

  const slug = useSlug(title)

  // The type SPECIALS has a different url structure
  const to =
    type === PAGES.SPECIALS
      ? EDITORIAL_DETAIL_ACTIONS[type](uuid, field_special_type, slug)
      : EDITORIAL_DETAIL_ACTIONS[type](uuid, slug)

  // By default use the internal router, fallback on a div if there's no link.
  // If there's an externalUrl set, override the linkProps.
  let linkProps = to ? { to, $as: RouterLink } : { $as: 'div' }
  const externalUrl = field_link && field_link.uri

  linkProps = externalUrl ? { href: externalUrl, $as: 'a' } : linkProps
  linkProps = { ...linkProps, title } // Add the title attribute by default

  let localeDate = field_publication_date

  let localeDateFormatted =
    field_publication_date && formatDate(new Date(field_publication_date.replace(' ', 'T')))
  /**
   * Sometimes we don't get a field_publication_date, but only a field_publication_year and / or field_publication_month
   * Then we need to convert it to a locale date that only shows the year or year and month
   */
  if (!field_publication_date && (field_publication_year || field_publication_month)) {
    localeDate = new Date(
      // Month (undefined or a string) - 1, check https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
      Date.UTC(field_publication_year, Number(field_publication_month) - 1 || 1, 1, 0, 0, 0),
    )

    localeDateFormatted = formatDate(
      localeDate,
      false,
      !!field_publication_month,
      !!field_publication_year,
    )
  }

  const imageIsVertical = type === PAGES.PUBLICATIONS

  const teaserImage = teaser_url && teaser_url
  const coverImage = media_image_url && media_image_url

  // Construct the file url when the type is PUBLICATION
  let fileUrl
  if (type === PAGES.PUBLICATIONS) {
    const { url } = field_file ? field_file.field_media_file.uri : {}
    fileUrl = url
  }

  let related = []
  if (field_related) {
    const reformattedRelatedResults = reformatJSONApiResults({ field_items: field_related })
    related = reformattedRelatedResults.map(dataItem => normalizeObject(dataItem, type))
  }
  return {
    key: uuid,
    id: uuid,
    title,
    body: body && body.value,
    teaserImage,
    coverImage,
    imageIsVertical,
    shortTitle: short_title,
    teaser: field_teaser,
    intro,
    specialType: field_special_type,
    fileUrl,
    localeDate,
    localeDateFormatted,
    slug,
    to,
    currentPage: type,
    linkProps,
    related,
    ...otherFields,
  }
}

const useNormalizedCMSResults = (data, type) => {
  // The data can be in the form of an array when used on the homepage or an overview page
  if (data.results || (data && data.length)) {
    const dataArray = data.results || data

    // Return different format when the data include links to other endpoints
    return data._links
      ? {
          data: dataArray.map(dataItem => normalizeObject(dataItem, type)),
          links: data._links,
        }
      : dataArray.map(dataItem => normalizeObject(dataItem, type))
  }

  // Format just a single data object
  return normalizeObject(data, type)
}

export default useNormalizedCMSResults
