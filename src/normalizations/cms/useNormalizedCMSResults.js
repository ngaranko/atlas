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
      }) => {
        const to = special_type
          ? EDITORIAL_DETAIL_ACTIONS[type](uuid, special_type, slug)
          : EDITORIAL_DETAIL_ACTIONS[type](uuid, slug || useSlug(title))

        console.log(to)
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
          localeDateFormatted:
            field_publication_date && formatDate(new Date(field_publication_date)),
          to,
        }
      },
    )
  }
  return []
}

export default useNormalizedCMSResults
