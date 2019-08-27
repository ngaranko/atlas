import { getByUrl } from '../../../shared/services/api/api'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'

import mapFetch from '../map-fetch/map-fetch'

const normalize = result => {
  const additionalFields = {
    geometry: result.bag_pand_geometrie,
    construction_year: result.bouwjaar && result.bouwjaar !== 1005 ? result.bouwjaar : 'Onbekend',
    monumental_status: result.monumentstatus || 'Geen monument',
  }
  return { ...result, ...additionalFields }
}

export function fetchByGeoLocation(location) {
  const uri = `${SHARED_CONFIG.API_ROOT}geosearch/vastgoed/?lat=${location.latitude}&lon=${location.longitude}&item=vastgoed&radius=0`

  return getByUrl(uri).then(result => {
    if (result.features && result.features.length > 1) {
      const features = result.features.map(({ properties }) => {
        return mapFetch(`${SHARED_CONFIG.API_ROOT}vsd/vastgoed/${properties.id}/`, normalize).then(
          property => property,
        )
      })

      return Promise.all(features).then(results => results)
    }

    return []
  })
}

export default normalize
