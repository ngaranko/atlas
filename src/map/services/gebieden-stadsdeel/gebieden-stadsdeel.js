import { getByUrl } from '../../../shared/services/api/api'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'

const normalize = async result => {
  const url = `${SHARED_CONFIG.API_ROOT}grondexploitatie/stadsdeel/${result.code}/`
  let grexStadsdeel

  try {
    grexStadsdeel = await getByUrl(url)
  } catch (e) {
    grexStadsdeel = false
  }

  const additionalFields = await {
    ...(await grexStadsdeel),
  }

  return { ...result, ...additionalFields }
}

export default normalize
