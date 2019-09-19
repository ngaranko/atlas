/* eslint-disable camelcase */
import { EDITORIAL_DETAIL_ACTIONS } from '../../app/pages/EditorialOverviewPage/constants'
import SHARED_CONFIG from '../../shared/services/shared-config/shared-config'
import useSlug from '../../app/utils/useSlug'
import formatDate from '../../shared/services/date-formatter/date-formatter'

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
        special_type,
        field_publication_date,
        field_publication_year,
        field_publication_month,
      }) => {
        const to = special_type
          ? EDITORIAL_DETAIL_ACTIONS[type](uuid, special_type, slug)
          : EDITORIAL_DETAIL_ACTIONS[type](uuid, slug || useSlug(title))

        let localeDateFormatted =
          field_publication_date && formatDate(new Date(field_publication_date))

        /**
         * Sometimes we don't get a field_publication_date, but only a field_publication_year and / or field_publication_month
         * Then we need to convert it to a locale date that only shows the year or year and month
         */
        if (!field_publication_date && (field_publication_year || field_publication_month)) {
          const localeDate = new Date(
            Date.UTC(field_publication_year, field_publication_month || 1, 1, 0, 0, 0),
          )

          localeDateFormatted = formatDate(
            localeDate,
            false,
            !!field_publication_month,
            !!field_publication_year,
          )
        }

        return {
          key: uuid,
          id: uuid,
          title,
          teaserImageUrl: teaser_url && `${SHARED_CONFIG.CMS_ROOT}${teaser_url}`,
          shortTitle: short_title,
          teaser: field_teaser,
          intro,
          specialType: special_type,
          localeDate: field_publication_date,
          localeDateFormatted,
          to,
          localeDataFormattedMonth: field_publication_month,
          localeDataFormattedYear: field_publication_year,
        }
      },
    )
  }
  return []
}

export default useNormalizedCMSResults
