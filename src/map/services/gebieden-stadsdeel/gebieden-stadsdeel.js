import { getByUrl } from '../../../shared/services/api/api'

const normalize = async result => {
  const url = `${process.env.API_ROOT}grondexploitatie/stadsdeel/${result.code}/`
  let grexStadsdeel

  try {
    // if the use doesn't have the correct authentication level this will throw
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
