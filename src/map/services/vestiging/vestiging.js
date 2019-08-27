import { getByUrl } from '../../../shared/services/api/api'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'

export function fetchByPandId(pandId) {
  const searchParams = {
    pand: pandId,
  }

  const queryString = Object.keys(searchParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return getByUrl(`${SHARED_CONFIG.API_ROOT}handelsregister/vestiging/?${queryString}`).then(
    data => data.results,
  )
}

export function fetchByAddressId(addressId) {
  const searchParams = {
    nummeraanduiding: addressId,
  }

  const queryString = Object.keys(searchParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return getByUrl(`${SHARED_CONFIG.API_ROOT}handelsregister/vestiging/?${queryString}`).then(
    data => data.results,
  )
}
