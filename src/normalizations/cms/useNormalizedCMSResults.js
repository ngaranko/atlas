/* eslint-disable camelcase */
import { EDITORIAL_DETAIL_ACTIONS } from '../../app/pages/EditorialOverviewPage/constants'
import SHARED_CONFIG from '../../shared/services/shared-config/shared-config'
import useSlug from '../../app/utils/useSlug'
import formatDate from '../../shared/services/date-formatter/date-formatter'
import PAGES from '../../app/pages'

const useNormalizedCMSResults = (aggregatedData, type) => {
  if (aggregatedData && aggregatedData.length) {
    return aggregatedData.map(
      ({
        uuid,
        slug,
        title,
        teaser_url,
        short_title,
        field_teaser,
        intro,
        field_special_type,
        field_publication_date,
        field_publication_year,
        field_publication_month,
        media_image_url,
      }) => {
        const to = field_special_type
          ? EDITORIAL_DETAIL_ACTIONS[type](uuid, field_special_type, slug)
          : EDITORIAL_DETAIL_ACTIONS[type](uuid, slug || useSlug(title))

        let localeDate = field_publication_date

        let localeDateFormatted =
          field_publication_date && formatDate(new Date(field_publication_date))

        /**
         * Sometimes we don't get a field_publication_date, but only a field_publication_year and / or field_publication_month
         * Then we need to convert it to a locale date that only shows the year or year and month
         */
        if (!field_publication_date && (field_publication_year || field_publication_month)) {
          localeDate = new Date(
            Date.UTC(field_publication_year, field_publication_month || 1, 1, 0, 0, 0),
          )

          localeDateFormatted = formatDate(
            localeDate,
            false,
            !!field_publication_month,
            !!field_publication_year,
          )
        }

        const buildImageUrl = url => `${SHARED_CONFIG.CMS_ROOT}${url}`

        const imageIsVertical = type === PAGES.PUBLICATIONS

        // Publications should show the 'cover' / 'media' image
        const image =
          type === PAGES.PUBLICATIONS
            ? media_image_url && buildImageUrl(media_image_url)
            : teaser_url && buildImageUrl(teaser_url)

        return {
          key: uuid,
          id: uuid,
          title,
          image,
          imageIsVertical,
          shortTitle: short_title,
          teaser: field_teaser,
          intro,
          specialType: field_special_type,
          localeDate,
          localeDateFormatted,
          to,
        }
      },
    )
  }
  return []
}

export default useNormalizedCMSResults
