import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'

import { getByUrl } from '../api/api'

export default function fetchByUri(uri) {
  return getByUrl(uri).then(result => {
    const geometryCenter = result.bag_pand_geometrie && getCenter(result.bag_pand_geometrie)
    const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null

    return {
      label: result._display,
      location: wgs84Center,
      geometrie: result.bag_pand_geometrie,
    }
  })
}
