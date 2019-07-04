import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'
import SHARED_CONFIG from '../shared-config/shared-config'
import { getByUrl } from '../api/api'

export default function fetchByUri(uri) {
  return getByUrl(uri).then(result => {
    const geometryCenter = result.bag_pand_geometrie && getCenter(result.bag_pand_geometrie)
    const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null

    return {
      label: result.object_naam || result._display,
      location: wgs84Center,
      geometrie: result.bag_pand_geometrie,
      construction_year: result.bouwjaar.toString(),
      status: result.status,
      monumental_status: result.monumentstatus,
      address: result.vhe_adres,
      usage: result.bag_verblijfsobject_gebruiksdoel_omschrijving,
      usage_type: result.huurtype,
      size: result.oppervlakte,
    }
  })
}

export function fetchByGeoLocation(location) {
  const uri = `${SHARED_CONFIG.API_ROOT}geosearch/vastgoed/?lat=${location.latitude}&lon=${
    location.longitude
  }&item=vastgoed&radius=0`

  return getByUrl(uri).then(result => {
    if (result.features && result.features.length > 1) {
      const features = result.features.map(({ properties }) => {
        return fetchByUri(`${SHARED_CONFIG.API_ROOT}vsd/vastgoed/${properties.id}/`).then(
          property => property,
        )
      })

      return Promise.all(features).then(results => results)
    }

    return []
  })
}
