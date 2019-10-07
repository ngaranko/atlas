import { getByUrl } from '../../../shared/services/api/api'

export function fetchByPandId(pandId) {
  const searchParams = {
    betreft_pand: pandId,
  }

  const queryString = Object.keys(searchParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return getByUrl(`${process.env.API_ROOT}monumenten/monumenten/?${queryString}`).then(
    data => data.results,
  )
}

export default fetchByPandId
