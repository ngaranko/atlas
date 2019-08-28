import getCenter from '../../../shared/services/geo-json/geo-json'
import { rdToWgs84 } from '../../../shared/services/coordinate-reference-system/crs-converter'

import { getByUrl } from '../../../shared/services/api/api'

export default function fetchByUri(uri, normalization = params => params) {
  return getByUrl(uri).then(async result => {
    const normalizedData = await normalization(result)

    const geometry = result.geometry || normalizedData.geometry

    const geometryCenter = geometry && getCenter(geometry)
    const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null

    return {
      label: result._display,
      ...(normalizedData || result),
      location: result.location || wgs84Center,
      geometrie: geometry,
    }
  })
}
